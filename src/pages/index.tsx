import React from 'react';
import { useRouter } from 'next/router';

import { Title, Grid, Card } from '@components/common';

import practice from '@common/practice';
import daily from '@common/daily';
import idiom from '@common/idiom';
import proverb from '@common/proverb';
import cryOfSilence from '@common/cry-of-silence';

const Home = () => {
  const router = useRouter();
  const moveProblem = (e: React.SyntheticEvent) => router.push(`/problem/${e.currentTarget.id}`);
  return (
    <div>
      <Title>단어 이어 말하기 게임</Title>

      <Grid>
        <Card id="practice" onClick={moveProblem}>
          <h2>{`연습게임(${practice.length})`}</h2>
        </Card>
        <Card id="daily" onClick={moveProblem}>
          <h2>{`일상단어(${daily.length})`}</h2>
        </Card>
        <Card id="idiom" onClick={moveProblem}>
          <h2>{`사자성어(${idiom.length})`}</h2>
        </Card>
        <Card id="proverb" onClick={moveProblem}>
          <h2>{`속담(${proverb.length})`}</h2>
        </Card>
        <Card id="cryOfSilence" onClick={moveProblem}>
          <h2>{`고요속의 외침(${cryOfSilence.length})`}</h2>
        </Card>
      </Grid>
    </div>
  );
};

export default Home;
