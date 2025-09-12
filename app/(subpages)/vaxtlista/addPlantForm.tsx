export default function AddPlantForm({
  styles,
  onSubmit,
}: {
  styles: string;
  onSubmit: (plant: string) => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const plant = formData.get("plant") as string;
    if (plant && plant.trim().length > 0) {
      onSubmit(plant.trim());
    }
    e.currentTarget.reset();
  };

  return (
    <form
      name="add-plant"
      className={styles}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="plant"
        autoComplete="off"
        placeholder="Ny växt"
      />
      <input type="submit" value="Spara" />
    </form>
  );
}
