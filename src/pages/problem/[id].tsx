import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Title, Layout, Content, Button, ButtonGroup, Timer } from '@components/common';

import data from '@common/data';

const globalTimers = 120 * 1000;
const defaultDelay = 3000;

const Problem = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentProblem, setCurrentProblem] = useState(0);
  const basicTimerDelay = id === 'cryOfSilence' ? globalTimers : defaultDelay;
  const [open, setOpen] = useState(false);
  const [delay, setDelay] = useState(basicTimerDelay);

  const problems = useMemo(
    () => (data?.[id?.toString() || 'undefined'] || []).sort(() => Math.random() - 0.5),
    [id]
  );
  const current = useMemo(
    () =>
      id === 'cryOfSilence'
        ? [problems[currentProblem]]
        : problems[currentProblem]?.split('-') || '',
    [id, problems, currentProblem]
  );
  const moveBack = () => router.back();
  const handleClickPrev = () => {
    if (id !== 'cryOfSilence') {
      if (currentProblem !== 0) {
        setOpen(false);
        setCurrentProblem(currentProblem - 1);
        setDelay(basicTimerDelay);
      }
    } else {
      if (currentProblem !== 0) {
        setCurrentProblem(currentProblem - 1);
      }
    }
  };
  const handleClickNext = () => {
    if (id !== 'cryOfSilence') {
      if (!open) {
        setDelay(0);
        setOpen(true);
        return;
      }
      if (currentProblem + 1 === problems.length) return moveBack();

      setOpen(false);
      setCurrentProblem(currentProblem + 1);
      setDelay(basicTimerDelay);
    } else {
      if (currentProblem + 1 === problems.length) return moveBack();
      setCurrentProblem(currentProblem + 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => delay > 0 && setDelay(delay - 10 < 0 ? 0 : delay - 10), 10);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Layout>
      <Title>{`${currentProblem + 1} / ${problems.length}`}</Title>

      <Content>
        {id !== 'cryOfSilence' ? (
          open ? (
            `${current[0]} ${current[1]}`
          ) : delay === 0 ? (
            '땡!!!'
          ) : (
            <>
              {current[0]}
              <Timer delay={delay} />
            </>
          )
        ) : (
          <>
            {current[0]}
            <Timer delay={delay} />
          </>
        )}
      </Content>

      <ButtonGroup>
        <Button onClick={handleClickPrev}>← 이전</Button>
        <Button onClick={moveBack}>종료</Button>
        <Button onClick={handleClickNext}>다음 →</Button>
      </ButtonGroup>
    </Layout>
  );
};

export default Problem;
