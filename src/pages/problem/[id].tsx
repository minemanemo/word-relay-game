import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Title, Layout, Content, Button, ButtonGroup } from '@components/common';

import data from '@common/data';

const Problem = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentProblem, setCurrentProblem] = useState(0);
  const [open, setOpen] = useState(false);

  const problems = useMemo(() => data?.[id?.toString() || 'undefined'] || [], [id]);
  const current = useMemo(
    () => problems[currentProblem]?.split('-') || '',
    [problems, currentProblem]
  );
  const moveBack = () => router.back();
  const handleClickPrev = () => {
    if (currentProblem !== 0) {
      setOpen(false);
      setCurrentProblem(currentProblem - 1);
    }
  };
  const handleClickNext = () => {
    if (!open) return setOpen(true);
    if (currentProblem + 1 === problems.length) return moveBack();

    setOpen(false);
    setCurrentProblem(currentProblem + 1);
  };

  return (
    <Layout>
      <Title>{`${currentProblem + 1} / ${problems.length}`}</Title>

      <Content>{open ? `${current[0]} ${current[1]}` : current[0]}</Content>

      <ButtonGroup>
        <Button onClick={handleClickPrev}>← 이전</Button>
        <Button onClick={moveBack}>종료</Button>
        <Button onClick={handleClickNext}>다음 →</Button>
      </ButtonGroup>
    </Layout>
  );
};

export default Problem;
