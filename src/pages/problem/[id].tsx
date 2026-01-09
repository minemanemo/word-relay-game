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
  const [successCount, setSuccessCount] = useState(0);

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
    } else {
      if (currentProblem + 1 === problems.length) return moveBack();
      setCurrentProblem(currentProblem + 1);
    }
  };

  const goToNextProblem = () => {
    if (currentProblem + 1 === problems.length) return moveBack();
    setOpen(false);
    setCurrentProblem(currentProblem + 1);
    setDelay(basicTimerDelay);
  };

  const handleSuccess = () => {
    setSuccessCount(successCount + 1);
    goToNextProblem();
  };

  const handleFail = () => {
    goToNextProblem();
  };

  useEffect(() => {
    const timer = setTimeout(() => delay > 0 && setDelay(delay - 10 < 0 ? 0 : delay - 10), 10);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Layout>
      <Title>
        {`${currentProblem + 1} / ${problems.length}`}
        {id !== 'cryOfSilence' && (
          <span style={{ fontSize: '1.5rem', marginLeft: '1rem', color: '#0070f3' }}>
            (성공: {successCount}개)
          </span>
        )}
      </Title>

      {id === 'cryOfSilence' && (
        <div style={{ textAlign: 'center' }}>
          <Timer delay={delay} />
        </div>
      )}

      <Content>
        {id !== 'cryOfSilence' ? (
          open ? (
            `${current[0]} ${current[1]}`
          ) : delay === 0 ? (
            '땡!!!'
          ) : (
            <>
              {current[0]} {current[1] ? current[1].replace(/[^\s]/g, 'ㅇ') : ''}
              <Timer delay={delay} />
            </>
          )
        ) : (
          current[0]
        )}
      </Content>

      {id !== 'cryOfSilence' && open && (
        <ButtonGroup style={{ bottom: '80px' }}>
          <Button onClick={handleSuccess} style={{ background: '#28a745' }}>
            성공 ✓
          </Button>
          <Button onClick={handleFail} style={{ background: '#dc3545' }}>
            실패 ✗
          </Button>
        </ButtonGroup>
      )}

      <ButtonGroup>
        <Button onClick={handleClickPrev}>← 이전</Button>
        <Button onClick={moveBack}>종료</Button>
        <Button
          onClick={id !== 'cryOfSilence' && open ? undefined : handleClickNext}
          style={
            id !== 'cryOfSilence' && open
              ? {
                  background: '#ccc',
                  cursor: 'not-allowed',
                  boxShadow: 'none',
                }
              : undefined
          }
        >
          다음 →
        </Button>
      </ButtonGroup>
    </Layout>
  );
};

export default Problem;
