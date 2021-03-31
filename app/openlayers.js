      function BuildLayerString()
      {
        var Server = "178.63.63.71";
        //var Server = "localhost";
        //var Server = "78.47.12.189";
        //var Server = "neptun";
				var l = MakeLayerList(layerFlags);
				var LayerString = "http://" + Server + "/showmap/gettile3.php?layers=" + l +"&x={x}&y={y}&z={z}&q=" 
				                + JpegQuality 
				                + "&f=-" + OutFormat 
				                + "&t=0";
        return LayerString;				                
			}
    
      function MakeLayerList(layerFlags)
      {
        var s = "";
        var fp = true;
        for (var i = 0; i < 28; i++)
        {                    
          if (layerFlags[i])
          {
            if (fp)
            {
							s += i;
							fp = false;
						}
						else
						{
							s += "," + i;
						}
          }
        }
        return s;
      }
    

			var layersArray = [];
			var layerFlags  = [];
      //var Braunschweig_LonLat = [0.0, 0.0];
      //var Braunschweig_Mercator = ol.proj.fromLonLat(Braunschweig_LonLat);
      
      
      
      window.app = {};
			var app = window.app;
			var map;
			var GradnetzVisisble = false;
			var JpegQuality = 100;  // nur fuer jpg-Format (100=optimal)
			var OutFormat = "jpg"; // png oder jpg
			
			layerFlags.push(true);
			for (var i = 1; i < 28; i++)
			{
			  layerFlags.push(true);
			}
			
			
      
     app.LayerControl = function(opt_options) 
     {
				var options = opt_options || {};
				
				var bodenbedeckung = document.getElementById('Bodenbedeckung');
				bodenbedeckung.addEventListener('click', function() 
				{
					SwitchLayers(1, 2);	
				  MakeLayerArray();
        }, false);

				var bodenbedeckung = document.getElementById('Linien');
				bodenbedeckung.addEventListener('click', function() 
				{
					SwitchLayers(3, 9); 
 				  MakeLayerArray();					
				}, false);
				

				var bodenbedeckung = document.getElementById('Symbole');
				bodenbedeckung.addEventListener('click', function() 
				{
					SwitchLayers(10, 18); 
 				  MakeLayerArray();					
				}, false);

				var bodenbedeckung = document.getElementById('Beschriftung');
				bodenbedeckung.addEventListener('click', function() 
				{
				  SwitchLayers(19, 27);
					MakeLayerArray();					
				}, false);
				
				
				/*
				var buttonL1 = document.createElement('button');
				buttonL1.innerHTML = 'L1';

				var buttonL2 = document.createElement('button');
				buttonL2.innerHTML = 'L2';

				var buttonL3 = document.createElement('button');
				buttonL3.innerHTML = 'L3';

				var buttonL4 = document.createElement('button');
				buttonL4.innerHTML = 'L4';
				*/
				

				//var buttonQ1 = document.createElement('button');
				//buttonQ1.innerHTML = 'Q';


  			function SwitchLayers(lmin, lmax)
				{
				  for (j = lmin; j <= lmax; j++)
				  {
						layerFlags[j] = !layerFlags[j];
				  }
				}

				function SwitchLayer(lx)
				{
					layerFlags[lx] = !layerFlags[lx];
				}
				function MakeLayerArray()
				{					
					var l = MakeLayerList(layerFlags);					
					//layersArray[0].getSource().setUrl("http://neptun/showmap/gettile3.php?layers=" + l +"&x={x}&y={y}&z={z}&q=" + JpegQuality &f=-jpg&t=0");
					layersArray[0].getSource().setUrl(BuildLayerString());
					
					
				}

				
				var this_ = this;
				
				/*
				var Layer1Func = function(e) 	
				{	
					//buttonL1.setAttribute("disabled", "1");
				  SwitchLayers(1, 2);	
				  MakeLayerArray();
				}
				var Layer2Func = function(e)  
				{	
				  SwitchLayers(3, 9); 
 				  MakeLayerArray();
				}
				var Layer3Func = function(e)  
				{	
				  SwitchLayers(10, 18); 
 				  MakeLayerArray();
				}
				var Layer4Func = function(e)  
				{	
				  SwitchLayers(19, 27);
					MakeLayerArray();
				}
				*/
				
				var QualityFunc = function(e)  
				{					  				
				  if (JpegQuality >= 90) JpegQuality = 10;
				  else                   JpegQuality = 90;  
				
					MakeLayerArray();
				}
				
				

			/*
				buttonL1.addEventListener('click', Layer1Func, false);
				buttonL2.addEventListener('click', Layer2Func, false);
				buttonL3.addEventListener('click', Layer3Func, false);
				buttonL4.addEventListener('click', Layer4Func, false);
				//buttonQ1.addEventListener('click', QualityFunc, false);
			*/	
				

				var element = document.createElement('div');
				element.className = 'rotate-north ol-selectable ol-control';				
				/*
				element.appendChild(buttonL1);
				element.appendChild(buttonL2);
				element.appendChild(buttonL3);
				element.appendChild(buttonL4);
				*/
				//element.appendChild(buttonQ1);

				ol.control.Control.call(this, {
					element: element,
					target: options.target
				});

		};
		ol.inherits(app.LayerControl, ol.control.Control); 
		

     

		var layer0 = new ol.layer.Tile({
		source: new ol.source.XYZ({              
		url: BuildLayerString(),
		wrapX: false,
    noWrap: true
		})
		});
		  

		layersArray.push(layer0);
			
		var interactions = ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false}); 
		
			
		map = new ol.Map({

		  interactions: interactions,
			controls: ol.control.defaults().extend([
					new ol.control.FullScreen(),
					new app.LayerControl(),           
					

			]),
						


			target: 'map',
			renderer: 'canvas',
			//renderer: /** @type {ol.renderer.Type} */ ('webgl'),
			
			layers: layersArray,
			view: new ol.View({
				center:  [0.0, 0.0],				
				zoom: 2,          
				minZoom: 1,
				maxZoom: 5,
				
				//resolutions: [65536, 32768, 16384, 8192, 4096, 2048,1024,512,256,128],				
				
			})
		});
