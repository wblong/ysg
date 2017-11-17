<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <NamedLayer>
    <Name>ysg_jzx</Name>
    <UserStyle>
      <Title>A cyan polygon style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Title>cyan polygon</Title>
          <MinScaleDenominator>10.0</MinScaleDenominator>  
  			  <MaxScaleDenominator>6000.0</MaxScaleDenominator> 
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#F7F2D2
              </CssParameter>
              <CssParameter name="fill-opacity">1</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#6E6E6E</CssParameter>
              <CssParameter name="stroke-width">0.4</CssParameter>
              <CssParameter name="fill-opacity">1</CssParameter>
            </Stroke>
          </PolygonSymbolizer>

        </Rule>

      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>