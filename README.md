# TypeScript Blockchain

타입스크립트로 구현한 간단한 블록체인 프로젝트입니다.

## 1. 프로젝트 개요

### 목적
- F/E 개발에서 JS, Vue.js, Nuxt.js 사용 시 느꼈던 막연한 어려움 해소
- Hannune 프로젝트에서 Typescript 적용을 제대로 못한 것에 대한 아쉬움 해소 
- TypeScript의 타입 안정성을 통한 더 나은 개발 경험 확보

### 개발 기간
- v1: 2일 (기초 구현)
- v2: 1일 (객체지향적 개선)

## 2. 버전 히스토리

### v1.0.0 (기초 학습)
- 기본적인 블록체인 구조 구현
- Block 클래스 생성
- 블록 추가 기능
- 단순 데이터 저장

### v2.0.0 (객체지향적 개선)
- 코드 구조 개선
  - 인터페이스를 통한 타입 정의 분리
  - 객체지향 원칙 적용 (캡슐화, 단일 책임)
  - 에러 처리 추가
- 기능 추가
  - 제네시스 블록 자동 생성
  - 데이터 대기열(mempool) 구현
  - 블록 유효성 검증
- 보안 개선
  - readonly를 통한 불변성 보장
  - 체인 유효성 검증
  - 해시 기반 데이터 무결성 검증

## 3. 프로젝트 구조
```
src/
├── models/ # 핵심 도메인 모델
│ ├── Block.ts
│ └── Blockchain.ts
├── interfaces/ # 핵심 도메인 모델
│ └── BlockShape.ts
├── errors/ # 에러 처리
│ └── BlockchainError.ts
└── index.ts # 메인 함수
```

## 4. 주요 학습 내용

### 4.1 TypeScript 기본
- 타입 시스템 이해
- 인터페이스와 타입 활용
- 제네릭 개념 습득
### 4.2 프로젝트 구성
- TypeScript 프로젝트 설정
- 개발 환경 구성
- 블록체인 기본 구현
## 4.3 주요 성과
- TypeScript의 타입 시스템 이해 및 활용
- 인터페이스를 통한 객체 지향 프로그래밍 구현
- 실제 프로젝트에서의 TypeScript 적용 경험
- 블록체인의 기본 개념 이해 및 구현
## 4.4 학습 포인트
1. TypeScript의 타입 안정성이 주는 이점
   - 컴파일 단계에서 타입 체크를 통해 런타임 에러를 사전에 방지
   - 코드 자동완성과 타입 추론을 통한 개발 생산성 향상

2. 컴파일 시점의 에러 체크
   - tsconfig.json을 통한 프로젝트 설정과 타입 체크 수준 조정
   - JSDoc과 @types를 활용한 JavaScript 라이브러리의 TypeScript 통합

3. 객체 지향 프로그래밍의 실제 적용
   - interface와 abstract class를 활용한 객체 구조 설계
   - implements와 extends를 통한 타입 안정성이 보장된 클래스 구현

4. 모던 개발 환경 구성 방법
   - ts-node와 nodemon을 활용한 개발 환경 최적화
   - ESModule과 CommonJS 모듈 시스템의 이해와 적용

5. 미니 프로젝트를 통한 TypeScript 활용
   - 블록체인 구현을 통한 타입 시스템의 실제 활용
   - 불변성과 타입 안정성을 고려한 데이터 구조 설계

## 5. 설치 및 실행

### 설치
``npm install``

### 개발 모드 실행
``npm run dev``

### 빌드
``npm run build``

## 참고
- v1: [TypeScript로 블록체인 만들기](https://nomadcoders.co/typescript-for-beginners)
- v2: 객체지향적 구조 개선과 블록체인 기본 개념을 활용하여 기능 추가

### SOLID 원칙 적용
- 단일 책임 원칙 (SRP) 각 클래스가 하나의 책임만 가질 수 있도록 분리함
// Block.ts - 블록 관련 책임만 담당
export class Block { ... }

// BlockchainError.ts - 에러 처리만 담당
export class BlockchainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BlockchainError';
    }
}

- 개방/폐쇄 원칙 (OCP) 인터페이스 구현을 통해 기본 코드를 수정하지 않고 확장할 수 있도록 함
// BlockShape.ts - 인터페이스로 정의
export interface BlockShape {
    hash: string;
    prevHash: string;
    height: number;
    data: string;
    timestamp: number;
}

// Block.ts - 인터페이스 구현
export class Block implements BlockShape {
    // BlockShape의 형태를 유지하면서 
    // 내부 구현은 자유롭게 변경/확장 가능
}
- 리스코프 치환 원칙 (LSP) - 상속 사용하지 않아서 아직 고려 안함
- 인터페이스 분리 원칙 (ISP) 큰 인터페이스 대신 작은 단위로 분리 - 추후 고려
```
// 블록 데이터 관련 인터페이스
interface BlockData {
    data: string;
    timestamp: number;
}

// 블록 해시 관련 인터페이스
interface BlockHash {
    hash: string;
    prevHash: string;
}

// 전체 블록 인터페이스
interface BlockShape extends BlockData, BlockHash {
    height: number;
}
```

- 의존관계 역전 원칙 (DIP)
1. 해시 계산 로직을 인터페이스로 정의하여 의존성 역전을 구현
    - 기존
        - Block 클래스가 직접 crypto 모듈에 의존하지 않도록 함
        - 해시 계산 로직이 Block 클래스 내부에 하드코딩 되어있었기 때문에 다른 해시 계산 방식을 사용하려면 Block 클래스를 직접 수정해야 했음
    - 개선
        - Block 클래스는 이제 구체적인 구현(crypto 모듈)이 아닌 추상화(IHashCaculator 인터페이스)에 의존한다.
        - HashCaculator 클래스는 IHashCaculator 인터페이스를 구현하여 해시 계산 로직을 제공한다.
        - 다른 해시 알고리즘이 필요하면 새로운 Calculator 클래스만 만들면 된다.
```
IHashCalculator.ts
export interface IHashCalculator {
  calculate(data: string): string;
}

---

Block.ts
import crypto from "crypto";
import { IHashCalculator } from "../interfaces/IHashCalculator";

export class HashCalculator implements IHashCalculator {
  calculate(data: string): string {
    return crypto.createHash("sha256").update(data).digest("hex");
  }
}
```