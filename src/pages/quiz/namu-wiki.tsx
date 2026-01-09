import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { Layout, Button, ButtonGroup } from '@components/common';
import {
  TopControlBar,
  WordBadge,
  BadgeLabel,
  BadgeText,
  TimerBox,
  TimerIcon,
  TimerText,
  PausedTag,
  BottomControlBar,
  ControlGroup,
  SmallButton,
  ClickCounterButton,
  JudgeButtons,
  JudgeBtn,
  PauseBtn,
  GameTitle,
  StatusBoard,
  StatusItem,
  StatusIcon,
  StatusCount,
  StatusLabel,
  StatusDivider,
  GameContent,
  SetupSection,
  SetupTitle,
  SetupGroup,
  SetupLabel,
  TimeButtons,
  TimeButton,
  ToggleButtons,
  ToggleButton,
  DifficultyButtons,
  DifficultyButton,
  CustomInputs,
  InputWrapper,
  InputLabel,
  CustomInput,
  ArrowIcon,
  StartButton,
  RuleBox,
  RuleTitle,
  RuleList,
  ResultSection,
  ResultBadge,
  ResultDetails,
  ResultRow,
  ResultLabel,
  ResultValue,
  NextButton,
  GamePlayingLayout,
  PlayingContent,
  WikiWindowInfo,
  WikiWindowTitle,
  WikiWindowStatus,
  ReadySection,
  ReadyTitle,
  ReadyWordDisplay,
  ReadyWordItem,
  ReadyWordLabel,
  ReadyWordText,
  ReadyArrow,
  OpenWikiButton,
  ReadyInfo,
  TimerNotStarted,
} from '@components/namu-wiki';
import Head from 'next/head';

interface WordPair {
  id: number;
  source: string;
  destination: string;
  difficulty: 'medium' | 'hard';
}

const WORD_PAIRS: WordPair[] = [
  // Medium (보통) - 일반 상식으로 풀 수 있는 연결
  { id: 1, source: '이명박', destination: '박지성', difficulty: 'medium' },
  { id: 2, source: '방탄소년단', destination: '신태용', difficulty: 'medium' },
  { id: 3, source: '현대자동차', destination: '정주영', difficulty: 'medium' },
  { id: 4, source: '싸이', destination: '빌보드', difficulty: 'medium' },
  { id: 5, source: '김연아', destination: '송강호', difficulty: 'medium' },
  { id: 7, source: '방탄소년단', destination: '삼성전자', difficulty: 'medium' },
  { id: 8, source: '아이유', destination: '토트넘', difficulty: 'medium' },
  { id: 9, source: '봉준호', destination: '김치', difficulty: 'medium' },
  { id: 12, source: '세종대왕', destination: '이병헌', difficulty: 'medium' },
  { id: 14, source: '백종원', destination: '무한도전', difficulty: 'medium' },
  { id: 18, source: '오징어 게임', destination: '올드보이', difficulty: 'medium' },
  { id: 21, source: '류현진', destination: '메이저 리그', difficulty: 'medium' },
  { id: 23, source: '박세리', destination: '베트남', difficulty: 'medium' },
  { id: 24, source: '제주도', destination: '베트남', difficulty: 'medium' },
  { id: 25, source: '김수현', destination: '블랙핑크', difficulty: 'medium' },
  { id: 26, source: '송강호', destination: '살인의 추억', difficulty: 'medium' },
  { id: 27, source: '이정재', destination: '오징어 게임', difficulty: 'medium' },
  { id: 28, source: '현빈', destination: '도깨비', difficulty: 'medium' },

  // Hard (어려움) - 창의적 탐색 필요, 일반 상식 기반
  { id: 31, source: '치킨', destination: '미국', difficulty: 'hard' },
  { id: 32, source: '소주', destination: '몽골', difficulty: 'hard' },
  { id: 33, source: '떡볶이', destination: '궁중', difficulty: 'hard' },
  { id: 34, source: '라면', destination: '일본', difficulty: 'hard' },
  { id: 35, source: '막걸리', destination: '고려', difficulty: 'hard' },
  { id: 36, source: '강남', destination: '말', difficulty: 'hard' },
  { id: 37, source: '태권도', destination: '올림픽', difficulty: 'hard' },
  { id: 38, source: 'K-POP', destination: '서태지', difficulty: 'hard' },
  { id: 39, source: '삼겹살', destination: '독일', difficulty: 'hard' },
  { id: 40, source: '짜장면', destination: '인천', difficulty: 'hard' },
  { id: 41, source: '비빔밥', destination: '전주', difficulty: 'hard' },
  { id: 42, source: '냉면', destination: '평양', difficulty: 'hard' },
  { id: 43, source: '삼계탕', destination: '복날', difficulty: 'hard' },
  { id: 44, source: '붕어빵', destination: '일본', difficulty: 'hard' },
  { id: 45, source: '무궁화', destination: '대한민국', difficulty: 'hard' },
  { id: 46, source: '태극기', destination: '박영효', difficulty: 'hard' },
  { id: 47, source: '애국가', destination: '안익태', difficulty: 'hard' },
  { id: 48, source: '독도', destination: '신라', difficulty: 'hard' },
  { id: 49, source: '광주', destination: '민주화', difficulty: 'hard' },
  { id: 50, source: '부산', destination: '6.25 전쟁', difficulty: 'hard' },
  { id: 51, source: '인천', destination: '상륙작전', difficulty: 'hard' },
  { id: 52, source: '경복궁', destination: '태조', difficulty: 'hard' },
  { id: 53, source: '창덕궁', destination: '유네스코', difficulty: 'hard' },
  { id: 54, source: '수원화성', destination: '정조', difficulty: 'hard' },
  { id: 55, source: '해인사', destination: '팔만대장경', difficulty: 'hard' },
  { id: 56, source: '불국사', destination: '신라', difficulty: 'hard' },
  { id: 57, source: '김밥', destination: '일본', difficulty: 'hard' },
  { id: 58, source: '한복', destination: '조선', difficulty: 'hard' },
  { id: 59, source: '서울', destination: '한양', difficulty: 'hard' },
  { id: 60, source: '광화문', destination: '세종대왕', difficulty: 'hard' },
  { id: 61, source: '남산타워', destination: '도쿄타워', difficulty: 'hard' },
  { id: 62, source: '63빌딩', destination: '여의도', difficulty: 'hard' },
  { id: 63, source: '롯데월드타워', destination: '잠실', difficulty: 'hard' },
  { id: 64, source: '청와대', destination: '경복궁', difficulty: 'hard' },
  { id: 65, source: '한강', destination: '한강의 기적', difficulty: 'hard' },
  { id: 66, source: '고속도로', destination: '경부고속도로', difficulty: 'hard' },
  { id: 67, source: 'KTX', destination: 'TGV', difficulty: 'hard' },
  { id: 68, source: '인천공항', destination: '영종도', difficulty: 'hard' },
  { id: 69, source: '김포공항', destination: '서울', difficulty: 'hard' },
  { id: 70, source: '부산항', destination: '컨테이너', difficulty: 'hard' },
];

// setup: 설정 화면
// ready: 문제 확인 후 나무위키 열기 대기
// playing: 타이머 진행 중
// paused: 일시정지
// finished: 결과 화면
type GameState = 'setup' | 'ready' | 'playing' | 'paused' | 'finished';

// 컨트롤 바 높이 (상단 + 하단)
const CONTROL_BAR_HEIGHT = 400;

const NamuWikiQuiz = () => {
  const router = useRouter();

  const [gameState, setGameState] = useState<GameState>('setup');
  const [currentPair, setCurrentPair] = useState<WordPair | null>(null);
  const [customSource, setCustomSource] = useState('');
  const [customDestination, setCustomDestination] = useState('');
  const [useCustomWords, setUseCustomWords] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'medium' | 'hard'>('all');

  const [timeLimit, setTimeLimit] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [lastResult, setLastResult] = useState<'success' | 'fail' | 'timeout' | null>(null);

  const [wikiWindow, setWikiWindow] = useState<Window | null>(null);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [shouldStartTimerOnMount, setShouldStartTimerOnMount] = useState(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setGameState('finished');
          setLastResult('timeout');
          setFailCount((f) => f + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // gameState가 'playing'으로 변경되면 타이머 시작
  useEffect(() => {
    if (gameState === 'playing' && shouldStartTimerOnMount) {
      startTimer();
      setShouldStartTimerOnMount(false);
    }
  }, [gameState, shouldStartTimerOnMount, startTimer]);

  // 나무위키 창 상태에 따라 타이머 제어
  // 창이 열려있을 때만 타이머 동작
  useEffect(() => {
    if (!isWindowOpen && gameState === 'playing') {
      // 창이 닫히면 타이머 일시정지
      stopTimer();
      setGameState('paused');
    } else if (isWindowOpen && gameState === 'paused') {
      // 창이 다시 열리면 타이머 재개
      startTimer();
      setGameState('playing');
    }
  }, [isWindowOpen, gameState, stopTimer, startTimer]);

  // 위키 창 열기 - 타이머가 보이는 위치에
  const openWikiWindow = useCallback(
    (url: string, shouldStartTimer: boolean = false) => {
      // 기존 창 닫기
      if (wikiWindow && !wikiWindow.closed) {
        wikiWindow.close();
      }

      // 화면 크기 계산
      const screenWidth = window.screen.availWidth;
      const screenHeight = window.screen.availHeight;

      // 새 창 크기와 위치 설정
      // 상단 컨트롤 바 아래에 위치하도록 설정
      const windowWidth = screenWidth;
      const windowHeight = screenHeight - CONTROL_BAR_HEIGHT;
      const windowTop = CONTROL_BAR_HEIGHT;
      const windowLeft = 0;

      const features = `width=${windowWidth},height=${windowHeight},top=${windowTop},left=${windowLeft},menubar=no,toolbar=no,location=yes,status=no,scrollbars=yes,resizable=yes`;

      const newWindow = window.open(url, 'namuWiki', features);

      if (newWindow) {
        setWikiWindow(newWindow);
        setIsWindowOpen(true);

        // 타이머 시작 플래그 설정 (useEffect에서 실제로 시작)
        if (shouldStartTimer) {
          setShouldStartTimerOnMount(true);
          setGameState('playing');
        }

        // 창이 닫혔는지 주기적으로 확인
        const checkWindow = setInterval(() => {
          if (newWindow.closed) {
            setIsWindowOpen(false);
            clearInterval(checkWindow);
          }
        }, 500);
      }
    },
    [wikiWindow]
  );

  // 게임 준비 (문제 선택)
  const prepareGame = useCallback(() => {
    let pair: WordPair;

    if (useCustomWords && customSource && customDestination) {
      pair = {
        id: 0,
        source: customSource,
        destination: customDestination,
        difficulty: 'medium',
      };
    } else {
      const filtered =
        selectedDifficulty === 'all'
          ? WORD_PAIRS
          : WORD_PAIRS.filter((p) => p.difficulty === selectedDifficulty);
      const randomIndex = Math.floor(Math.random() * filtered.length);
      pair = filtered[randomIndex];
    }

    setCurrentPair(pair);
    setTimeLeft(timeLimit);
    setClickCount(0);
    setLastResult(null);
    setGameState('ready');
  }, [useCustomWords, customSource, customDestination, selectedDifficulty, timeLimit]);

  // 나무위키 열기 + 타이머 시작
  const openWikiAndStartTimer = () => {
    if (currentPair) {
      const url = `https://namu.wiki/w/${encodeURIComponent(currentPair.source)}`;
      openWikiWindow(url, true);
    }
  };

  const handleJudge = (result: 'success' | 'fail') => {
    stopTimer();
    setLastResult(result);
    setGameState('finished');

    if (result === 'success') {
      setSuccessCount((prev) => prev + 1);
    } else {
      setFailCount((prev) => prev + 1);
    }

    // 위키 창 닫기
    if (wikiWindow && !wikiWindow.closed) {
      wikiWindow.close();
    }
    setIsWindowOpen(false);
  };

  const togglePause = () => {
    if (gameState === 'playing') {
      stopTimer();
      setGameState('paused');
    } else if (gameState === 'paused') {
      startTimer();
      setGameState('playing');
    }
  };

  const incrementClick = () => {
    setClickCount((prev) => prev + 1);
  };

  const nextGame = () => {
    setGameState('setup');
    setCurrentPair(null);
    setLastResult(null);
  };

  const resetAll = () => {
    stopTimer();
    setSuccessCount(0);
    setFailCount(0);
    setGameState('setup');
    setCurrentPair(null);
    setLastResult(null);
    if (wikiWindow && !wikiWindow.closed) {
      wikiWindow.close();
    }
    setIsWindowOpen(false);
  };

  const backToSetup = () => {
    setGameState('setup');
    setCurrentPair(null);
  };

  const moveBack = () => {
    stopTimer();
    if (wikiWindow && !wikiWindow.closed) {
      wikiWindow.close();
    }
    router.back();
  };

  const reopenWikiWindow = () => {
    if (currentPair) {
      const url = `https://namu.wiki/w/${encodeURIComponent(currentPair.source)}`;
      openWikiWindow(url, false);
    }
  };

  // 창 포커스 관리
  const focusWikiWindow = () => {
    if (wikiWindow && !wikiWindow.closed) {
      wikiWindow.focus();
    }
  };

  useEffect(() => {
    return () => {
      stopTimer();
      if (wikiWindow && !wikiWindow.closed) {
        wikiWindow.close();
      }
    };
  }, [stopTimer, wikiWindow]);

  const total = successCount + failCount;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isPlaying = gameState === 'playing' || gameState === 'paused';

  return (
    <>
      <Head>
        <title>나무위키 퀴즈 - MINEMANEMO</title>
      </Head>

      {/* 게임 설정 화면 */}
      {gameState === 'setup' && (
        <Layout>
          <GameTitle>📚 나무위키 퀴즈</GameTitle>

          <StatusBoard>
            <StatusItem>
              <StatusIcon>✅</StatusIcon>
              <StatusCount>{successCount}</StatusCount>
              <StatusLabel>성공</StatusLabel>
            </StatusItem>
            <StatusDivider />
            <StatusItem>
              <StatusIcon>📊</StatusIcon>
              <StatusCount>{total}</StatusCount>
              <StatusLabel>총 게임</StatusLabel>
            </StatusItem>
            <StatusDivider />
            <StatusItem>
              <StatusIcon>❌</StatusIcon>
              <StatusCount>{failCount}</StatusCount>
              <StatusLabel>실패</StatusLabel>
            </StatusItem>
            <StatusDivider />
            <StatusItem>
              <StatusIcon>📈</StatusIcon>
              <StatusCount>{total > 0 ? Math.round((successCount / total) * 100) : 0}%</StatusCount>
              <StatusLabel>성공률</StatusLabel>
            </StatusItem>
          </StatusBoard>

          <GameContent>
            <SetupSection>
              <SetupTitle>🎯 게임 설정</SetupTitle>

              <SetupGroup>
                <SetupLabel>⏱️ 제한 시간</SetupLabel>
                <TimeButtons>
                  {[30, 60, 90, 120, 180].map((t) => (
                    <TimeButton key={t} $selected={timeLimit === t} onClick={() => setTimeLimit(t)}>
                      {t < 60 ? `${t}초` : `${t / 60}분`}
                    </TimeButton>
                  ))}
                </TimeButtons>
              </SetupGroup>

              <SetupGroup>
                <SetupLabel>🎲 단어 선택</SetupLabel>
                <ToggleButtons>
                  <ToggleButton
                    $selected={!useCustomWords}
                    onClick={() => setUseCustomWords(false)}
                  >
                    랜덤 선택
                  </ToggleButton>
                  <ToggleButton $selected={useCustomWords} onClick={() => setUseCustomWords(true)}>
                    직접 입력
                  </ToggleButton>
                </ToggleButtons>
              </SetupGroup>

              {!useCustomWords ? (
                <SetupGroup>
                  <SetupLabel>📊 난이도</SetupLabel>
                  <DifficultyButtons>
                    {(['all', 'medium', 'hard'] as const).map((d) => (
                      <DifficultyButton
                        key={d}
                        $selected={selectedDifficulty === d}
                        $difficulty={d}
                        onClick={() => setSelectedDifficulty(d)}
                      >
                        {d === 'all' ? '전체' : d === 'medium' ? '보통' : '어려움'}
                      </DifficultyButton>
                    ))}
                  </DifficultyButtons>
                </SetupGroup>
              ) : (
                <SetupGroup>
                  <SetupLabel>✏️ 단어 입력</SetupLabel>
                  <CustomInputs>
                    <InputWrapper>
                      <InputLabel>출발 단어</InputLabel>
                      <CustomInput
                        value={customSource}
                        onChange={(e) => setCustomSource(e.target.value)}
                        placeholder="예: 대한민국"
                      />
                    </InputWrapper>
                    <ArrowIcon>→</ArrowIcon>
                    <InputWrapper>
                      <InputLabel>도착 단어</InputLabel>
                      <CustomInput
                        value={customDestination}
                        onChange={(e) => setCustomDestination(e.target.value)}
                        placeholder="예: 서울"
                      />
                    </InputWrapper>
                  </CustomInputs>
                </SetupGroup>
              )}

              <StartButton
                onClick={prepareGame}
                disabled={useCustomWords && (!customSource || !customDestination)}
              >
                🎲 문제 뽑기
              </StartButton>

              <RuleBox>
                <RuleTitle>📖 게임 규칙</RuleTitle>
                <RuleList>
                  <li>출발 단어의 나무위키 문서에서 시작합니다</li>
                  <li>문서 내의 하이퍼링크만 클릭하여 이동합니다</li>
                  <li>제한 시간 내에 도착 단어 문서에 도달하면 성공!</li>
                  <li>브라우저 검색이나 URL 직접 입력은 금지입니다</li>
                </RuleList>
              </RuleBox>
            </SetupSection>
          </GameContent>

          <ButtonGroup>
            <Button onClick={resetAll}>초기화</Button>
            <Button onClick={moveBack}>종료</Button>
          </ButtonGroup>
        </Layout>
      )}

      {/* 문제 확인 화면 - 나무위키 열기 전 대기 */}
      {gameState === 'ready' && currentPair && (
        <Layout>
          <GameTitle>📚 나무위키 퀴즈</GameTitle>

          <StatusBoard>
            <StatusItem>
              <StatusIcon>✅</StatusIcon>
              <StatusCount>{successCount}</StatusCount>
              <StatusLabel>성공</StatusLabel>
            </StatusItem>
            <StatusDivider />
            <StatusItem>
              <StatusIcon>📊</StatusIcon>
              <StatusCount>{total}</StatusCount>
              <StatusLabel>총 게임</StatusLabel>
            </StatusItem>
            <StatusDivider />
            <StatusItem>
              <StatusIcon>❌</StatusIcon>
              <StatusCount>{failCount}</StatusCount>
              <StatusLabel>실패</StatusLabel>
            </StatusItem>
            <StatusDivider />
            <StatusItem>
              <StatusIcon>📈</StatusIcon>
              <StatusCount>{total > 0 ? Math.round((successCount / total) * 100) : 0}%</StatusCount>
              <StatusLabel>성공률</StatusLabel>
            </StatusItem>
          </StatusBoard>

          <GameContent>
            <ReadySection>
              <ReadyTitle>🎯 오늘의 문제</ReadyTitle>

              <ReadyWordDisplay>
                <ReadyWordItem $type="source">
                  <ReadyWordLabel>출발</ReadyWordLabel>
                  <ReadyWordText>{currentPair.source}</ReadyWordText>
                </ReadyWordItem>

                <ReadyArrow>→</ReadyArrow>

                <ReadyWordItem $type="destination">
                  <ReadyWordLabel>도착</ReadyWordLabel>
                  <ReadyWordText>{currentPair.destination}</ReadyWordText>
                </ReadyWordItem>
              </ReadyWordDisplay>

              <TimerNotStarted>⏱️ 제한 시간: {formatTime(timeLimit)}</TimerNotStarted>

              <OpenWikiButton onClick={openWikiAndStartTimer}>
                🚀 나무위키 열기 (타이머 시작)
              </OpenWikiButton>

              <ReadyInfo>
                💡 버튼을 누르면 나무위키가 새 창에서 열리고 타이머가 시작됩니다
              </ReadyInfo>
            </ReadySection>
          </GameContent>

          <ButtonGroup>
            <Button onClick={backToSetup}>다른 문제</Button>
            <Button onClick={moveBack}>종료</Button>
          </ButtonGroup>
        </Layout>
      )}

      {/* 게임 진행 중 - 상단 고정 컨트롤 바 */}
      {isPlaying && currentPair && (
        <GamePlayingLayout>
          {/* 상단 컨트롤 바 */}
          <TopControlBar>
            <WordBadge $type="source">
              <BadgeLabel>출발</BadgeLabel>
              <BadgeText>{currentPair.source}</BadgeText>
            </WordBadge>

            <TimerBox $urgent={timeLeft <= 10}>
              <TimerIcon>{timeLeft <= 10 ? '🔥' : '⏱️'}</TimerIcon>
              <TimerText $urgent={timeLeft <= 10}>{formatTime(timeLeft)}</TimerText>
              {gameState === 'paused' && <PausedTag>일시정지</PausedTag>}
            </TimerBox>

            <WordBadge $type="destination">
              <BadgeLabel>도착</BadgeLabel>
              <BadgeText>{currentPair.destination}</BadgeText>
            </WordBadge>
          </TopControlBar>

          {/* 중앙 콘텐츠 영역 */}
          <PlayingContent>
            <WikiWindowInfo>
              <WikiWindowTitle>📺 나무위키 창</WikiWindowTitle>
              <WikiWindowStatus $isOpen={isWindowOpen}>
                {isWindowOpen ? '✅ 열림' : '❌ 닫힘'}
              </WikiWindowStatus>
            </WikiWindowInfo>

            {!isWindowOpen && (
              <SmallButton onClick={reopenWikiWindow} style={{ marginTop: '10px' }}>
                🔗 나무위키 창 다시 열기
              </SmallButton>
            )}

            {isWindowOpen && (
              <SmallButton onClick={focusWikiWindow} style={{ marginTop: '10px' }}>
                🔍 나무위키 창으로 이동
              </SmallButton>
            )}
          </PlayingContent>

          {/* 하단 컨트롤 바 */}
          <BottomControlBar>
            <ControlGroup>
              <SmallButton onClick={reopenWikiWindow}>🔗 새 창</SmallButton>
              <ClickCounterButton onClick={incrementClick}>
                👆 클릭: {clickCount}
              </ClickCounterButton>
            </ControlGroup>

            <JudgeButtons>
              <JudgeBtn $type="success" onClick={() => handleJudge('success')}>
                ✅ 성공
              </JudgeBtn>
              <PauseBtn onClick={togglePause}>{gameState === 'paused' ? '▶️' : '⏸️'}</PauseBtn>
              <JudgeBtn $type="fail" onClick={() => handleJudge('fail')}>
                ❌ 실패
              </JudgeBtn>
            </JudgeButtons>

            <ControlGroup>
              <SmallButton onClick={resetAll}>🔄 초기화</SmallButton>
              <SmallButton onClick={moveBack}>🚪 종료</SmallButton>
            </ControlGroup>
          </BottomControlBar>
        </GamePlayingLayout>
      )}

      {/* 결과 화면 */}
      {gameState === 'finished' && currentPair && (
        <Layout>
          <GameTitle>📚 나무위키 퀴즈</GameTitle>

          <StatusBoard>
            <StatusItem>
              <StatusIcon>✅</StatusIcon>
              <StatusCount>{successCount}</StatusCount>
              <StatusLabel>성공</StatusLabel>
            </StatusItem>
            <StatusDivider />
            <StatusItem>
              <StatusIcon>📊</StatusIcon>
              <StatusCount>{total}</StatusCount>
              <StatusLabel>총 게임</StatusLabel>
            </StatusItem>
            <StatusDivider />
            <StatusItem>
              <StatusIcon>❌</StatusIcon>
              <StatusCount>{failCount}</StatusCount>
              <StatusLabel>실패</StatusLabel>
            </StatusItem>
            <StatusDivider />
            <StatusItem>
              <StatusIcon>📈</StatusIcon>
              <StatusCount>{total > 0 ? Math.round((successCount / total) * 100) : 0}%</StatusCount>
              <StatusLabel>성공률</StatusLabel>
            </StatusItem>
          </StatusBoard>

          <GameContent>
            <ResultSection $result={lastResult}>
              <ResultBadge $result={lastResult}>
                {lastResult === 'success'
                  ? '🎉 성공!'
                  : lastResult === 'timeout'
                  ? '⏰ 시간 초과!'
                  : '😢 실패!'}
              </ResultBadge>

              <ResultDetails>
                <ResultRow>
                  <ResultLabel>경로</ResultLabel>
                  <ResultValue>
                    {currentPair.source} → {currentPair.destination}
                  </ResultValue>
                </ResultRow>
                <ResultRow>
                  <ResultLabel>소요 시간</ResultLabel>
                  <ResultValue>{formatTime(timeLimit - timeLeft)}</ResultValue>
                </ResultRow>
                <ResultRow>
                  <ResultLabel>클릭 횟수</ResultLabel>
                  <ResultValue>{clickCount}회</ResultValue>
                </ResultRow>
              </ResultDetails>

              <NextButton onClick={nextGame}>🔄 다음 게임</NextButton>
            </ResultSection>
          </GameContent>

          <ButtonGroup>
            <Button onClick={resetAll}>초기화</Button>
            <Button onClick={moveBack}>종료</Button>
          </ButtonGroup>
        </Layout>
      )}
    </>
  );
};

export default NamuWikiQuiz;
