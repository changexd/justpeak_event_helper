function Event({ date, text } :any) {
  return (
    <div className="MyPage__Event">
      <p>{date}</p>
      <p>{text}</p>
    </div>
  );
}
export default function MyPage() {
  const data = [{ text: 'sometext here', date: '4/19' }, { text: 'sometext heresometext heresometext heresometext heresometext here', date: '4/19' }];
  const eventdisplay = data.map((evt) => { return <Event date={evt.date} text={evt.text} />; });
  return (
    <div className="MyPage">
      <div className="MyPage__Info">
        <div><span><img alt="asd" /></span></div>
        <p>Name here</p>
      </div>
      <div className="MyPage__History">
        <div className="MyPage__label"><p>label here</p><p>label here</p></div>
        <div className="MyPage__Events">{eventdisplay}</div>
        <div className="MyPage__Arrows"><p>&lt;</p><p>&gt;</p></div>
      </div>
    </div>
  );
}
