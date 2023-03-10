import "../styles/cardHolder.css";
export default function CardHolder({ children }) {
  return (
    <>
      <div className="cards-holder">{children}</div>
    </>
  );
}
export function ListCardHolder({ children }) {
  return (
    <>
      <div className="list-cards-holder">{children}</div>
    </>
  );
}
