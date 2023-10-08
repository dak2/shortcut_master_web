import { Header } from 'app/components/Layout/Header';

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
