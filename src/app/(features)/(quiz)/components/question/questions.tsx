'use client';
import Link from 'next/link';
import { css } from '../../../../../../styled-system/css';
import { cva } from '../../../../../../styled-system/css/cva';
import { MAX_QUESTION_SIZE, Question } from 'app/entity/Question';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import Answers from 'app/(features)/(quiz)/components/answer/answers';
import { QuizNames } from 'app/entity/Quiz';
import { AnsweredContents } from 'app/entity/Answer';
import toast from 'react-hot-toast';

const containerCss = css({
  display: 'grid',
  placeItems: 'center',
  marginTop: '3%',
});

const questionTitleCss = css({
  fontSize: '2rem',
});

const questionSelectTextCss = css({
  marginTop: '1%',
  marginBottom: '2%',
  fontSize: '1.5rem',
});

const pageLinkCss = cva({
  base: {
    textAlign: 'center',
    verticalAlign: 'middle',
    textDecoration: 'none',
    padding: '1rem 4rem',
    fontWeight: 'bold',
    borderRadius: '100vh',
    background: '#F39C12',
    color: '#fff',
    cursor: 'pointer',
  },
  variants: {
    pageState: {
      invalid: { marginTop: '5%' },
    },
  },
});

const handleResultPage = (event: React.MouseEvent<HTMLAnchorElement>, answers: AnsweredContents, type: QuizNames) => {
  const answerNumbersSet = new Set([...Array(MAX_QUESTION_SIZE).keys()].map((n) => n + 1));
  const answeredNumbersSet = new Set(Object.keys(answers[type]).map((n) => Number(n)));
  const unansweredNumbersSet = new Set([...answerNumbersSet].filter((n) => !answeredNumbersSet.has(n)));
  const unansweredNumbers = [...unansweredNumbersSet].sort((a, b) => a - b).map((n) => `Q${n}`);

  if (unansweredNumbers.length > 0) {
    event.preventDefault();
    toast.error(`${unansweredNumbers.join()}の質問に回答してください。`, {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
    });
    return;
  }
};

const handleLink = (
  event: React.MouseEvent<HTMLAnchorElement>,
  isLastQuestion: boolean,
  answers: AnsweredContents,
  type: QuizNames,
  answeredContent?: string,
) => {
  if (!answeredContent) {
    event.preventDefault();
    toast.error('選択してください', {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
    });
    return;
  }

  if (isLastQuestion) handleResultPage(event, answers, type);
};

const InvalidPage = ({ router }: { router: AppRouterInstance }) => {
  return (
    <div className={containerCss}>
      <div>
        <h1 className={questionTitleCss}>無効な質問ページです</h1>
      </div>
      <button type="button" onClick={() => router.back()} className={pageLinkCss({ pageState: 'invalid' })}>
        前のページに戻る
      </button>
    </div>
  );
};

export default function Questions(
  router: AppRouterInstance,
  type: QuizNames,
  answers: AnsweredContents,
  isLastQuestion: boolean,
  question?: Question,
) {
  if (question && question?.id <= MAX_QUESTION_SIZE) {
    const nextPageLink = isLastQuestion ? 'results' : question?.id + 1;
    const nextPageText = isLastQuestion ? '回答結果を確認する' : '次の質問へ';
    const currentAnsweredContent = answers[type][question?.id];
    return (
      <div className={containerCss}>
        <div>
          <h1 className={questionTitleCss}>
            Q{question?.id}: {question?.contents}
          </h1>
        </div>
        <h2 className={questionSelectTextCss}>選択してください</h2>
        <Answers type={type} questionId={question?.id} />
        <Link
          href={`${nextPageLink}`}
          className={pageLinkCss()}
          onClick={(e) => handleLink(e, isLastQuestion, answers, type, currentAnsweredContent)}
          scroll={false}
        >
          <p>{nextPageText}</p>
        </Link>
      </div>
    );
  }
  return <InvalidPage router={router} />;
}
