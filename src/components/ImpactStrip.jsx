const tickerItems = ['COLLABORATION', 'CREATIVITY', 'DIGITAL LITERACY', 'POSITIVE IMPACT']

function TickerGroup() {
  return <div className="impact-group">{tickerItems.map((item, index) => <span key={`${item}-${index}`}>{item}<b>✳</b></span>)}</div>
}

export function ImpactStrip() {
  return <div className="impact-strip" aria-label="Kagama Digi principles"><div className="impact-track"><TickerGroup /><TickerGroup /></div></div>
}
