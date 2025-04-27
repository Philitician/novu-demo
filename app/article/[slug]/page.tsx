export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = await params;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{slug.slug}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    </div>
  );
}
