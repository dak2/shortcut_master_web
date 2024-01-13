import { Answer } from 'app/entity/Answer';
import { AnswerHistory } from 'app/entity/AnswerHistory';
import { Question } from 'app/entity/Question';
import { Quiz } from 'app/entity/Quiz';

const API_URL_BASE = 'http://127.0.0.1:3000';

type Response = Quiz | Question | AnswerHistory | Answer;
type Domain = 'quizzes' | 'questions' | 'answer_histories' | 'answers';
type Params = { [x in string]: string };
type Body = { [x in string]: object | string };

export const getFetch = async <T extends Response>(domain: Domain, params?: Params) => {
  const url = params ? `${API_URL_BASE}/${domain}?${new URLSearchParams(params)}` : `${API_URL_BASE}/${domain}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data: T[] = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}. Please try again`);
  }
};

export const postFetch = async <T extends Response>(domain: Domain, body: Body) => {
  try {
    const res = await fetch(`${API_URL_BASE}/${domain}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data: T[] = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}. Please try again`);
  }
};
