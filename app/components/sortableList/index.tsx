"use client";
import {
  useState,
  useRef,
  useEffect,
  ReactNode,
  ReactElement,
  Children,
} from "react";
import { flushSync } from "react-dom";
import { softClamp } from "@/lib/utils/softClamp";
import styles from "./sortableList.module.css";
import { cardStyles } from "@/app/components/styles";
import cn from "@/lib/utils/addClassNames";
import { startViewTransition } from "@/lib/utils/startViewTransition";

type SortableItemProps = {
  id: string;
  children: ReactNode;
};

export const Item = ({ children }: SortableItemProps) => <>{children}</>;

const defaultId = crypto.randomUUID();

type SortableListProps = {
  listId?: string;
  dragMarginBlock?: number;
  dragMarginInline?: number;
  listOrder?: string[];
  onOrderChange?: (ids: string[]) => void;
  children: ReactNode;
};

const SortableList = ({
  listId = defaultId,
  dragMarginBlock = 100,
  dragMarginInline = 20,
  listOrder,
  onOrderChange,
  children,
}: SortableListProps) => {

  // Manage children and order state
  const [order, setOrder] = useState<string[]>(() => {
    return (
      listOrder ||
      (Children.toArray(children) as ReactElement<SortableItemProps>[]).map(
        (c) => c.props.id
      )
    );
  });
  const [childMap, setChildMap] = useState(
    new Map(
      (Children.toArray(children) as ReactElement<SortableItemProps>[]).map(
        (c) => [c.props.id, c]
      )
    )
  );

  // Update childMap and order when children change so that list renders new items
  useEffect(() => {
    setChildMap(
      new Map(
        (Children.toArray(children) as ReactElement<SortableItemProps>[]).map(
          (c) => [c.props.id, c]
        )
      )
    );

    // Update order to match new children while preserving existing order
    setOrder((prev) => {
      const newIds = (
        Children.toArray(children) as ReactElement<SortableItemProps>[]
      ).map((c) => c.props.id);
      // Keep the previous order but remove any ids that are no longer present
      const filteredPrev = prev.filter((id) => newIds.includes(id));
      // Add any new ids that were not in the previous order
      const addedNew = newIds.filter((id) => !filteredPrev.includes(id));
      return [...filteredPrev, ...addedNew];
    });

    startViewTransition(() => {
      setOrder((prev) => {
        const newIds = (
          Children.toArray(children) as ReactElement<SortableItemProps>[]
        ).map((c) => c.props.id);
        // Keep the previous order but remove any ids that are no longer present
        const filteredPrev = prev.filter((id) => newIds.includes(id));
        // Add any new ids that were not in the previous order
        const addedNew = newIds.filter((id) => !filteredPrev.includes(id));
        return [...filteredPrev, ...addedNew];
      });
    });
  }, [children]);

  // Drag state
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [previewY, setPreviewY] = useState<number | null>(null);

  // Refs to display and position the drag preview
  const listRef = useRef<HTMLOListElement | null>(null);
  const listRectRef = useRef<DOMRect | null>(null);
  const previewRef = useRef<HTMLLIElement | null>(null);
  const invisibleDragImage = useRef<HTMLElement | null>(null);

  // create invisible ghost-element as drag image
  // or reuse ghost if already created
  useEffect(() => {
    const ghost =
      document.getElementById("invisible-drag-image") ??
      Object.assign(document.createElement("div"), {
        id: "invisible-drag-image",
        style:
          "width: 2px; height: 2px; background: transparent; z-index: -1; position: absolute; top: -1000px; left: -1000px;",
      });
    if (!ghost.parentNode) document.body.appendChild(ghost);
    invisibleDragImage.current = ghost;
  }, []);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.stopPropagation();
    setDraggedItemId(id);

    if (listRef.current) {
      listRectRef.current = listRef.current.getBoundingClientRect();
    }
    if (invisibleDragImage.current) {
      e.dataTransfer.setDragImage(invisibleDragImage.current, 0, 0);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.stopPropagation();
    if (!draggedItemId || e.clientY <= 0 || !listRectRef.current) return;

    // end dragging when moving the cursor outside list + margin
    const { top, left, right, bottom, height } = listRectRef.current;
    const insideX =
      e.clientX >= left - dragMarginInline &&
      e.clientX <= right + dragMarginInline;
    const insideY =
      e.clientY >= top - dragMarginBlock &&
      e.clientY <= bottom + dragMarginBlock;

    if (!insideX || !insideY) {
      handleDropOrEnd();
      return;
    }

    // clamp with margin
    const localY = e.clientY - top;
    const previewHeight = previewRef.current?.offsetHeight ?? 0;
    const half = previewHeight / 2;
    const clampedY = softClamp(localY, half, height - half);

    setPreviewY(clampedY);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move"; // show move cursor

    if (!draggedItemId || draggedItemId === targetId) return;

    // reorder items
    startViewTransition(() => {
      setOrder((prev) => {
        const newOrder = [...prev];
        const from = newOrder.indexOf(draggedItemId);
        const to = newOrder.indexOf(targetId);

        if (from === -1 || to === -1) return prev;

        newOrder.splice(from, 1);
        newOrder.splice(to, 0, draggedItemId);
        return newOrder;
      });
    });
  };

  const handleDropOrEnd = () => {
    if (!draggedItemId) return;
    document.startViewTransition(() => {
      flushSync(() => {
        setDraggedItemId(null);
        setPreviewY(null);
      });
    });

    // Notify parent of order change
    if (onOrderChange) onOrderChange(order);
  };

  return (
    <ol
      className={cn(
        cardStyles.cardList,
        styles.sortableList,
        draggedItemId && styles.onDrag
      )}
      ref={listRef}
    >
      {order.map((orderId) => {
        const child = childMap.get(orderId);
        if (!child) return null;
        const { id } = child.props;
        return (
          <li
            key={id}
            id={id}
            draggable={childMap.size > 1}
            onDragStart={(e) => handleDragStart(e, id)}
            onDrag={handleDrag}
            onDragOver={(e) => handleDragOver(e, id)}
            onDrop={handleDropOrEnd}
            onDragEnd={handleDropOrEnd}
            className={cn(
              styles.sortableItem,
              cardStyles.card,
              draggedItemId === id && cardStyles.placeholder
            )}
            style={{ viewTransitionName: `item-${id}` }}
          >
            {child.props.children}
          </li>
        );
      })}

      {draggedItemId && previewY !== null && (
        <li
          ref={previewRef}
          className={cn(styles.dragPreview, cardStyles.card, cardStyles.lifted)}
          style={{
            viewTransitionName: `preview-${listId}`,
            transform: `translateY(calc(-50% + ${previewY}px))`,
          }}
        >
          {childMap.get(draggedItemId)?.props.children}
        </li>
      )}
    </ol>
  );
};
SortableList.Item = Item;
export default SortableList;
