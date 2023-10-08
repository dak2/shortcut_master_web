// entry point of quizzes
export default async function Page({ params }: { params: { type: string } }) {
  return <div>My Quiz: {params.type}</div>;
}
