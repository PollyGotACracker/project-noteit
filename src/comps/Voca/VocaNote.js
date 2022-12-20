import VocaList from "./VocaList";

const VocaNote = () => {
  return (
    <main className="Note">
      <section className="Note top">
        <div className="Note category"></div>
        <button>추가</button>
      </section>
      <section className="Note form">
        <form>
          <input />
          <button>검색</button>
        </form>
      </section>
      <section className="Note content">
        <ul>
          <VocaList />
        </ul>
      </section>
    </main>
  );
};
export default VocaNote;
