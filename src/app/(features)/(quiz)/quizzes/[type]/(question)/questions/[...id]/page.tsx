// entry point of questions
export default async function Page({ params }: { params: { type: string; id: number } }) {
  return (
    <div>
      aaaaa: {params.id} / {params.type}
    </div>
  );
}
