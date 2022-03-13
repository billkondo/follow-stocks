const MOCK_STOCK_QUOTATION_HTML = `
  <div id="quote-header-info">
    <div>
      <div>
        <div>
          <h1>Xp Log Fundo Investimento Imobiliario FII (XPLG11.SA)</h1>
        </div>
        <div class="C($tertiaryColor) Fz(12px)">
          <span>São Paulo - São Paulo Delayed Price. Currency in BRL</span>
        </div>
      </div>
    </div>
    <div>
      <div>
        <div>
          <fin-streamer
            data-symbol="XPLG11.SA" data-test="qsp-price"
            data-field="regularMarketPrice" data-trend="none"
            data-pricehint="2" value="256.43" active="">256.43
          </fin-streamer>
          <fin-streamer
            data-symbol="XPLG11.SA" data-test="qsp-price-change"
            data-field="regularMarketChange" data-trend="txt"
            data-pricehint="2" value="0.65999603" active="">
            <span>+0.66</span>
          </fin-streamer>
          <fin-streamer
            data-symbol="XPLG11.SA"
            data-field="regularMarketChangePercent"
            data-trend="txt" data-pricehint="2"
            data-template="({fmt})" value="0.0065410906"
            active="">
            <span>(+0.65%)</span>
          </fin-streamer>
          <fin-streamer data-symbol="XPLG11.SA"
            changeev="regularTimeChange"
            data-field="regularMarketTime" data-trend="none"
            value="" active="true"></fin-streamer>
          <fin-streamer data-symbol="XPLG11.SA"
            changeev="marketState" data-field="marketState"
            data-trend="none" value="" active="true">
          </fin-streamer>
          <div id="quote-market-notice">
            <span>At close:  06:08PM BRT</span>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export default MOCK_STOCK_QUOTATION_HTML;
