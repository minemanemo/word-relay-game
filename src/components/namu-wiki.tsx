import styled, { keyframes, css } from 'styled-components';
import { Title } from '@components/common';

// Animations
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const urgentPulse = keyframes`
  0%, 100% { color: #e74c3c; transform: scale(1); }
  50% { color: #ff6b6b; transform: scale(1.1); }
`;

export const popIn = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
`;

export const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Full Screen Layout for Playing
export const FullScreenLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
`;

export const TopControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

export const WordBadge = styled.div<{ $type: 'source' | 'destination' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 20px;
  border-radius: 12px;
  background: ${({ $type }) => $type === 'source'
    ? 'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)'
    : 'linear-gradient(135deg, #f39c12 0%, #e74c3c 100%)'};
  min-width: 120px;
`;

export const BadgeLabel = styled.span`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.8);
`;

export const BadgeText = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
`;

export const TimerBox = styled.div<{ $urgent: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 25px;
  background: ${({ $urgent }) => $urgent ? 'rgba(231, 76, 60, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 15px;
  border: 2px solid ${({ $urgent }) => $urgent ? '#e74c3c' : 'rgba(255, 255, 255, 0.3)'};
`;

export const TimerIcon = styled.span`
  font-size: 1.5rem;
`;

export const TimerText = styled.span<{ $urgent: boolean }>`
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  color: ${({ $urgent }) => $urgent ? '#e74c3c' : 'white'};
  ${({ $urgent }) => $urgent && css`
    animation: ${urgentPulse} 0.5s ease-in-out infinite;
  `}
`;

export const PausedTag = styled.span`
  background: #f39c12;
  color: white;
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: bold;
`;

export const IframeContainer = styled.div`
  flex: 1;
  position: relative;
  background: white;
  margin: 10px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

export const WikiIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export const IframeOverlay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${slideUp} 0.5s ease-out 2s both;
`;

export const OverlayMessage = styled.div`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.85rem;
  backdrop-filter: blur(5px);
`;

export const IframeErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 15px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

export const ErrorIcon = styled.span`
  font-size: 4rem;
`;

export const ErrorTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

export const ErrorText = styled.p`
  margin: 0;
  color: #666;
`;

export const OpenNewWindowButton = styled.button`
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(108, 92, 231, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(108, 92, 231, 0.4);
  }
`;

export const BottomControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.2);
`;

export const ControlGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const SmallButton = styled.button`
  padding: 10px 15px;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const ClickCounterButton = styled.button`
  padding: 10px 15px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #00d2d3;
  background: rgba(0, 210, 211, 0.1);
  border: 1px solid rgba(0, 210, 211, 0.3);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 210, 211, 0.2);
  }
`;

export const JudgeButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const JudgeBtn = styled.button<{ $type: 'success' | 'fail' }>`
  padding: 12px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${({ $type }) => $type === 'success' ? css`
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
    box-shadow: 0 5px 15px rgba(46, 204, 113, 0.4);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(46, 204, 113, 0.5);
    }
  ` : css`
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(231, 76, 60, 0.5);
    }
  `}
`;

export const PauseBtn = styled.button`
  padding: 12px 20px;
  font-size: 1.2rem;
  color: white;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

// Original Styled Components (Setup & Result screens)
export const GameTitle = styled(Title)`
  background: linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.2rem;
  padding: 15px 0;
`;

export const StatusBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 15px 25px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  margin: 0 auto;
  width: fit-content;
  flex-wrap: wrap;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

export const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
`;

export const StatusIcon = styled.span`
  font-size: 1.5rem;
  margin-bottom: 2px;
`;

export const StatusCount = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
`;

export const StatusLabel = styled.span`
  font-size: 0.75rem;
  color: #a0a0a0;
  margin-top: 2px;
`;

export const StatusDivider = styled.div`
  width: 1px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
`;

export const GameContent = styled.div`
  position: absolute;
  top: 180px;
  left: 20px;
  right: 20px;
  bottom: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 10px;
`;

export const SetupSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const SetupTitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin: 1.5rem 0 0;
  color: #333;
`;

export const SetupGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SetupLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #555;
`;

export const TimeButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const TimeButton = styled.button<{ $selected: boolean }>`
  padding: 10px 18px;
  border: 2px solid ${({ $selected }) => $selected ? '#54a0ff' : '#ddd'};
  border-radius: 10px;
  background: ${({ $selected }) => $selected ? '#54a0ff' : 'white'};
  color: ${({ $selected }) => $selected ? 'white' : '#333'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #54a0ff;
  }
`;

export const ToggleButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const ToggleButton = styled.button<{ $selected: boolean }>`
  flex: 1;
  padding: 12px;
  border: 2px solid ${({ $selected }) => $selected ? '#00d2d3' : '#ddd'};
  border-radius: 10px;
  background: ${({ $selected }) => $selected ? '#00d2d3' : 'white'};
  color: ${({ $selected }) => $selected ? 'white' : '#333'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #00d2d3;
  }
`;

export const DifficultyButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const DifficultyButton = styled.button<{ $selected: boolean; $difficulty: string }>`
  padding: 10px 16px;
  border: 2px solid ${({ $selected, $difficulty }) => {
    if (!$selected) return '#ddd';
    switch($difficulty) {
      case 'easy': return '#2ecc71';
      case 'medium': return '#f39c12';
      case 'hard': return '#e74c3c';
      default: return '#54a0ff';
    }
  }};
  border-radius: 10px;
  background: ${({ $selected, $difficulty }) => {
    if (!$selected) return 'white';
    switch($difficulty) {
      case 'easy': return '#2ecc71';
      case 'medium': return '#f39c12';
      case 'hard': return '#e74c3c';
      default: return '#54a0ff';
    }
  }};
  color: ${({ $selected }) => $selected ? 'white' : '#333'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const CustomInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const InputLabel = styled.span`
  font-size: 0.85rem;
  color: #888;
`;

export const CustomInput = styled.input`
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #00d2d3;
  }
`;

export const ArrowIcon = styled.span`
  font-size: 1.5rem;
  color: #54a0ff;
  margin-top: 20px;
`;

export const StartButton = styled.button`
  padding: 18px 40px;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%);
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 210, 211, 0.4);
  margin-top: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 210, 211, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const RuleBox = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  margin-top: 10px;
`;

export const RuleTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1rem;
  color: #555;
`;

export const RuleList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.8;
`;

export const ResultSection = styled.div<{ $result: 'success' | 'fail' | 'timeout' | null }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 40px;
  border-radius: 25px;
  animation: ${popIn} 0.5s ease-out;
  background: ${({ $result }) => {
    if ($result === 'success') return 'linear-gradient(135deg, rgba(46, 204, 113, 0.15) 0%, rgba(39, 174, 96, 0.15) 100%)';
    return 'linear-gradient(135deg, rgba(231, 76, 60, 0.15) 0%, rgba(192, 57, 43, 0.15) 100%)';
  }};
  border: 3px solid ${({ $result }) => $result === 'success' ? 'rgba(46, 204, 113, 0.5)' : 'rgba(231, 76, 60, 0.5)'};
  width: 100%;
  max-width: 400px;
`;

export const ResultBadge = styled.div<{ $result: 'success' | 'fail' | 'timeout' | null }>`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ $result }) => $result === 'success' ? '#2ecc71' : '#e74c3c'};
`;

export const ResultDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const ResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
`;

export const ResultLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

export const ResultValue = styled.span`
  color: #333;
  font-weight: 700;
`;

export const NextButton = styled.button`
  padding: 15px 40px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%);
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 210, 211, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 210, 211, 0.4);
  }
`;

// Game Playing Layout (새 창 모드용)
export const GamePlayingLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 160px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%);
  z-index: 9999;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.5);
`;

export const PlayingContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(135deg, #16213e 0%, #1a1a2e 100%);
`;

export const WikiWindowInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const WikiWindowTitle = styled.span`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`;

export const WikiWindowStatus = styled.span<{ $isOpen: boolean }>`
  font-size: 0.9rem;
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 8px;
  background: ${({ $isOpen }) => $isOpen 
    ? 'rgba(46, 204, 113, 0.2)' 
    : 'rgba(231, 76, 60, 0.2)'};
  color: ${({ $isOpen }) => $isOpen ? '#2ecc71' : '#e74c3c'};
  border: 1px solid ${({ $isOpen }) => $isOpen 
    ? 'rgba(46, 204, 113, 0.3)' 
    : 'rgba(231, 76, 60, 0.3)'};
`;

// Ready Screen (문제 확인 화면)
export const ReadySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  width: 100%;
  max-width: 500px;
  animation: ${fadeIn} 0.4s ease-out;
`;

export const ReadyTitle = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin: 0;
  color: #333;
`;

export const ReadyWordDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ReadyWordItem = styled.div<{ $type: 'source' | 'destination' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px;
  border-radius: 20px;
  min-width: 150px;
  background: ${({ $type }) => $type === 'source'
    ? 'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)'
    : 'linear-gradient(135deg, #f39c12 0%, #e74c3c 100%)'};
  box-shadow: ${({ $type }) => $type === 'source'
    ? '0 8px 25px rgba(0, 210, 211, 0.4)'
    : '0 8px 25px rgba(231, 76, 60, 0.4)'};
  animation: ${popIn} 0.5s ease-out;
  animation-delay: ${({ $type }) => $type === 'source' ? '0s' : '0.1s'};
  animation-fill-mode: both;
`;

export const ReadyWordLabel = styled.span`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 5px;
`;

export const ReadyWordText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-align: center;
`;

export const ReadyArrow = styled.span`
  font-size: 2.5rem;
  color: #54a0ff;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

export const OpenWikiButton = styled.button`
  padding: 20px 50px;
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(46, 204, 113, 0.4);
  margin-top: 10px;
  animation: ${popIn} 0.5s ease-out;
  animation-delay: 0.3s;
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 40px rgba(46, 204, 113, 0.5);
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`;

export const ReadyInfo = styled.p`
  font-size: 0.95rem;
  color: #666;
  text-align: center;
  margin: 0;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`;

export const TimerNotStarted = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #54a0ff;
  padding: 12px 25px;
  background: rgba(84, 160, 255, 0.1);
  border-radius: 15px;
  border: 2px solid rgba(84, 160, 255, 0.3);
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: 0.25s;
  animation-fill-mode: both;
`;
