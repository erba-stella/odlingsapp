import { Modal } from "./Modal";

export default async function PlantPageModal({
  params,
}: {
  params: Promise<{ plantId: string }>;
  }) {
  
  const { plantId } = await params; 
  console.log("PlantPageModal loaded with plantId:", plantId);
   
  return (
    <Modal>
      <h1>Plant Page Modal - {plantId}</h1>
      <p>This is where we will have the modal...</p>
    </Modal>
  );
}