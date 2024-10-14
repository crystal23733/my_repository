import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "../../styles/common/FullscreenImage.module.scss";

interface FullscreenImageProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

/**
 * FullscreenImage 컴포넌트
 *
 * 이미지를 전체화면으로 표시하고, 키보드 이벤트를 처리하여 이미지를 넘길 수 있게 합니다.
 *
 * @component
 * @param {Object} props
 * @param {string[]} props.images - 표시할 이미지 URL 배열
 * @param {number} [props.initialIndex=0] - 초기에 표시할 이미지의 인덱스
 * @param {() => void} props.onClose - 전체화면 모드를 종료하는 함수
 */
const FullscreenImage: React.FC<FullscreenImageProps> = ({
  images,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [nextImage, prevImage, onClose],
  );

  useEffect(() => {
    const container = containerRef.current;
  
    if (container && !document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(`전체화면 모드 활성화 중 오류 발생: ${err.message}`);
      });
    }
  
    const exitHandler = () => {
      if (!document.fullscreenElement) {
        onClose(); // 전체화면 해제 시 컴포넌트 닫기
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", exitHandler); // 전체화면 해제 감지
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", exitHandler);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
          console.error(`전체화면 모드 종료 중 오류 발생: ${err.message}`);
        });
      }
    };
  }, [handleKeyDown, onClose]);
  

  return (
    <div ref={containerRef} className={styles.fullscreenImage}>
      <img
        src={images[currentIndex]}
        alt={`전체화면 ${currentIndex + 1}`}
        className={styles.image}
      />
      <button
        onClick={prevImage}
        className={`${styles.navButton} ${styles.prev}`}
      >
        이전
      </button>
      <button
        onClick={nextImage}
        className={`${styles.navButton} ${styles.next}`}
      >
        다음
      </button>
      <button onClick={onClose} className={styles.closeButton}>
        닫기
      </button>
    </div>
  );
};

export default FullscreenImage;
