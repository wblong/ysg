<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <NamedLayer>
    <Name>ysg_road</Name>
    <UserStyle>
      <Title>A cyan line style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Title>cyan line</Title>
          <MinScaleDenominator>60.0</MinScaleDenominator>  
  			  <MaxScaleDenominator>30000.0</MaxScaleDenominator> 
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#0099cc</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>

      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>