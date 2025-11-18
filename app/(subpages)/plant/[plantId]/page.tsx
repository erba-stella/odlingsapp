export default async function PlantPage({
  params,
}: {
  params: Promise<{ plantId: string }>;
  }) {
  const { plantId } = await params;
  return (
    <div>
      <h1>Plant Page - {plantId}</h1>
      <p>
        This is the plant page content. Att the same content here as in the
        modal
      </p>
    </div>
  );
}