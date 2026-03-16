function isAuthorized(reqPassword) {
  const pw = process.env.SITE_PASSWORD || '';
  return pw && reqPassword && pw === reqPassword;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST만 가능합니다.' });
  }

  try {
    const { mode, text, password } = req.body || {};

    if (!isAuthorized(password)) {
      return res.status(401).json({ error: '비밀번호가 올바르지 않습니다.' });
    }

    let userPrompt = '';
    let systemPrompt = '너는 한국 학생을 위한 영어 도우미다. 정확하고 짧고 이해하기 쉽게 설명한다.';

    if (mode === 'word') {
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: '단어를 입력하세요.' });
      }
      userPrompt = `다음 영단어를 설명해줘.
단어: ${text}

형식:
1) 뜻
2) 품사
3) 쉬운 예문 2개`;
    } else if (mode === 'sentence') {
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: '문장을 입력하세요.' });
      }
      userPrompt = `다음 영문장을 검사해줘:
${text}

중요:
- 가능한 올바른 문장이 2개 이상이면 여러 개 제시해라.
- 시제나 의미 차이가 있으면 아주 쉽게 차이를 설명해라.
- 답이 하나만 있는 척하지 마라.
- 한국 초중등 학생이 이해하기 쉽게 써라.

형식:
1) 맞는 문장인지 먼저 말하기
2) 틀린 부분
3) 이유
4) 가능한 올바른 문장들
5) 문장들 사이의 차이`;
    } else {
      return res.status(400).json({ error: '알 수 없는 요청입니다.' });
    }

    const openaiRes = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        input: [
          {
            role: 'system',
            content: [{ type: 'input_text', text: systemPrompt }]
          },
          {
            role: 'user',
            content: [{ type: 'input_text', text: userPrompt }]
          }
        ]
      })
    });

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      const message = data?.error?.code === 'insufficient_quota'
        ? '크레딧이 없습니다. OpenAI Billing에서 결제 또는 크레딧 충전이 필요합니다.'
        : (data?.error?.message || 'OpenAI API 오류가 발생했습니다.');
      return res.status(openaiRes.status).json({ error: message });
    }

    let result = data.output_text || '';

    if (!result && Array.isArray(data.output)) {
      const texts = [];
      for (const item of data.output) {
        if (Array.isArray(item.content)) {
          for (const c of item.content) {
            if (c.type === 'output_text' && c.text) texts.push(c.text);
          }
        }
      }
      result = texts.join('\n');
    }

    return res.status(200).json({ result: result || '응답이 없습니다.' });
  } catch (error) {
    return res.status(500).json({ error: error.message || '서버 오류가 발생했습니다.' });
  }
}
