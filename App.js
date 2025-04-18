import { useState } from 'react';

const terms = {
  "비유": "어떤 대상을 다른 대상에 빗대어 표현하는 방법.",
  "은유": "비교하는 표현 없이 직접 다른 것에 빗대는 표현.",
  "직유": "'같이', '처럼' 등의 말을 써서 직접 비교하는 표현.",
  "대구": "비슷하거나 상반되는 구절을 짝지어 표현하는 방법.",
  "역설": "겉으로는 모순되지만 그 속에 진리를 담은 표현.",
  "반어": "뜻과 반대되게 표현하여 강조하는 방법.",
  "상징": "추상적 개념을 구체적 사물로 나타내는 표현.",
  "운율": "문장이나 시에서 리듬감을 주는 요소."
};

export default function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = () => {
    const found = terms[query.trim()];
    setResult(found ? found : "찾는 용어가 없습니다.");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>국어 개념 용어 검색기</h1>
      <input
        type="text"
        placeholder="예: 은유, 직유, 반어..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <button
        onClick={handleSearch}
        style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', marginTop: '10px' }}
      >
        검색하기
      </button>
      {result && (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '12px', width: '300px', textAlign: 'center' }}>
          {result}
        </div>
      )}
    </div>
  );
}
