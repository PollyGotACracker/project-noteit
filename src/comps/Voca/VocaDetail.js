const VocaDetail = () => {
  return (
    <main className="Detail">
      <section className="Detail title">
        <div>카테고리</div>
        <div>주제</div>
        <div>키워드 수</div>
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </section>
      <section className="Detail slide">
        <button>앞</button>
        <div>
          <div className="Detail keyword">여러 키워드들 반복</div>
        </div>
        <button>뒤</button>
      </section>
      <section className="Detail memo"></section>
    </main>
  );
};
export default VocaDetail;
