import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Title, Layout, Content, Button, ButtonGroup } from '@components/common';

interface RandomResult {
  classNumber: number;
  studentNumber: number;
}

const ClassAndNumber = () => {
  const router = useRouter();
  const { maxClass, maxNumber } = router.query;
  
  const maxClassValue = useMemo(() => {
    const parsed = parseInt(maxClass as string, 10);
    return isNaN(parsed) || parsed <= 0 ? 6 : parsed;
  }, [maxClass]);
  
  const maxNumberValue = useMemo(() => {
    const parsed = parseInt(maxNumber as string, 10);
    return isNaN(parsed) || parsed <= 0 ? 36 : parsed;
  }, [maxNumber]);

  const [history, setHistory] = useState<RandomResult[]>([]);

  const isDuplicate = (classNum: number, studentNum: number) => {
    return history.some(
      (item) => item.classNumber === classNum && item.studentNumber === studentNum
    );
  };

  const isAllExtracted = () => {
    return history.length >= maxClassValue * maxNumberValue;
  };

  const generateRandom = () => {
    if (isAllExtracted()) {
      alert('모든 조합이 추출되었습니다!');
      return;
    }

    let randomClass: number;
    let randomNumber: number;

    do {
      randomClass = Math.floor(Math.random() * maxClassValue) + 1;
      randomNumber = Math.floor(Math.random() * maxNumberValue) + 1;
    } while (isDuplicate(randomClass, randomNumber));

    setHistory((prev) => [...prev, { classNumber: randomClass, studentNumber: randomNumber }]);
  };

  const clearHistory = () => setHistory([]);
  const moveBack = () => router.back();

  const latestResult = history.length > 0 ? history[history.length - 1] : null;

  return (
    <Layout>
      <Title>랜덤 반 및 번호</Title>

      <Content>
        {latestResult ? (
          <div>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
              {latestResult.classNumber}반 {latestResult.studentNumber}번
            </div>
            <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1.5rem' }}>
              최대 반: {maxClassValue}, 최대 번호: {maxNumberValue} | 남은 조합: {maxClassValue * maxNumberValue - history.length}개
            </div>
            <div style={{ 
              maxHeight: '500px', 
              overflowY: 'auto', 
              fontSize: '1rem',
              fontWeight: 'normal'
            }}>
              <table style={{ 
                borderCollapse: 'collapse', 
                margin: '0 auto',
                width: '100%',
                maxWidth: '500px'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0' }}>
                    <th style={{ border: '1px solid #ddd', padding: '8px', width: '33%' }}>순번</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', width: '33%' }}>반</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', width: '33%' }}>번호</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr key={index} style={{ 
                      backgroundColor: index === history.length - 1 ? '#e6f3ff' : 'white'
                    }}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.classNumber}반</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.studentNumber}번</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '2rem', color: '#999' }}>
            버튼을 눌러 랜덤 값을 추출하세요
          </div>
        )}
      </Content>

      <ButtonGroup>
        <Button onClick={generateRandom}>추출</Button>
        <Button onClick={clearHistory}>초기화</Button>
        <Button onClick={moveBack}>종료</Button>
      </ButtonGroup>
    </Layout>
  );
};

export default ClassAndNumber;
