아르케 영어 도우미 - 비밀번호 보호 Vercel 버전

이 버전은 사이트 첫 화면에서 공용 비밀번호를 맞춰야 들어갈 수 있습니다.

[기능]
- 비밀번호 입력 후 입장
- 단어 뜻 + 발음
- 문장 오류 검사
- API 키는 Vercel 환경변수에 숨김

[꼭 넣어야 하는 환경변수 2개]
1. OPENAI_API_KEY = 네 OpenAI API 키
2. SITE_PASSWORD = 사이트 입장 비밀번호

[배포 순서]
1. 이 zip을 압축 푼다
2. GitHub 저장소에 파일 올린다
3. Vercel에서 Import 한다
4. 환경변수 2개 넣는다
5. Deploy 한다
