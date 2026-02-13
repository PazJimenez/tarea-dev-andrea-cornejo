import * as fs from 'fs';

interface TestCase {
  panelW: number;
  panelH: number;
  roofW: number;
  roofH: number;
  expected: number;
}

interface TestData {
  testCases: TestCase[];
}

function calculatePanels(
  panelWidth: number,
  panelHeight: number,
  roofWidth: number,
  roofHeight: number
): number {

  if (
    panelWidth < 0 ||
    panelHeight < 0 ||
    roofWidth < 0 ||
    roofHeight < 0 ||
    panelWidth > roofWidth ||
    panelHeight > roofHeight
  ) {
    return 0;
  }


    var countWidth = 0
    var countHeight = 0
    var rotationCountWidth = 0
    var rotationCountHeight = 0
    var finalRotationCount = 0
    let newWidth = roofWidth 
    let newHeight = roofHeight

    while ((newWidth >= panelWidth)) {

      newWidth = newWidth - panelWidth
      countWidth++;
      //console.log("newWidht1:", newWidth);   
    }

    while (newHeight >= panelHeight) {
      
      newHeight = newHeight - panelHeight
      countHeight++;
      //console.log("newHeight1:", newHeight);
    }

    if (newHeight < panelWidth && newWidth >= panelHeight) {
      newHeight = roofHeight
    }

    if (newWidth < panelHeight && newHeight >= panelWidth) {
      newWidth = roofWidth
    }



    while (newWidth >= panelHeight) {
      newWidth = newWidth - panelHeight
      rotationCountWidth++
      //console.log("newWidht2:", newWidth);
    }

    while (newHeight >= panelWidth) {
      newHeight = newHeight - panelWidth
      rotationCountHeight++
      //console.log("newHeight2:", newHeight);

    }


  /*console.log("newWidht:", newWidth);    
  console.log("newHeight:", newHeight);
  console.log("countWidht:", countWidth);    
  console.log("countHeight:", countHeight);
  console.log("rotationCountWidth:", rotationCountWidth);
  console.log("rotationCountHeight:", rotationCountHeight);*/


  if (rotationCountHeight && rotationCountWidth !== 0) {
    finalRotationCount = rotationCountWidth * rotationCountHeight

  } else if (rotationCountWidth == 0) {
    finalRotationCount = rotationCountHeight
  } else if (rotationCountHeight == 0) {
    finalRotationCount = rotationCountWidth
  }

  //console.log("finalRotationCount:", finalRotationCount);


  return (countWidth * countHeight) + (finalRotationCount)

}

interface TestCaseTriangle {
  panelW: number;
  panelH: number;
  roofB: number;
  roofH: number;
  expected: number;
}

interface TestDataTriangle {
  testCases: TestCaseTriangle[];
}

function calculatePanelsTriangle(
  panelWidth: number,
  panelHeight: number,
  roofBase: number,
  roofHeight: number
): number {

  var factorPendienteAcostado = (((((panelHeight - roofHeight) * ((-roofBase)/2))/roofHeight)) * 2) - roofBase
  //console.log("primerRectAcostado:", factorPendienteAcostado);  

  // factorPendienteAcostado son las unidades de espacio que se pierden entre el primer 
  // rectángulo puesto sobre la base, apoyado en el lado del triángulo
  //       
  //       /\
  //      /  \
  //     /    \ 
  //    /      \ 
  //   /        \ 
  //  / _________\ 
  // /_|____|____|\
  //              ^ 
  //              |  
  //            Este espacio a ambos lados (*2)

  var factorPendienteParado = (((roofHeight/(-roofBase/2)) * (panelHeight/2) + roofHeight)) - roofHeight
  //console.log("primerRectParado:", factorPendienteParado);  

  // factorPendienteParado son las unidades de espacio que se pierden entre el primer 
  // rectángulo puesto sobre la linea de la altura y el vertice superior del triángulo 
  //      ^  
  //     / \ <- Ese espacio
  //    /_|_\ 
  //   /|   |\ 
  //  /_|___|_\ 
  // /|   |   |\   




  if (
    panelWidth < 0 ||
    panelHeight < 0 ||
    roofBase < 0 ||
    roofHeight < 0 ||
    panelWidth > (roofBase + factorPendienteAcostado) ||
    panelHeight > (roofBase + factorPendienteParado)
  ) {
    return 0;
  }


    var countWidth = 0
    var countHeight = 1
    let newWidth = roofBase + factorPendienteAcostado
    let newHeight = roofHeight //+ factorPendienteParado
    let newWidthescalon = 0

    while (newWidth >= panelWidth && newHeight >= panelHeight) {


      newHeight = newHeight - panelHeight
      newWidthescalon = newWidth

      while (newWidthescalon >= panelWidth) {
        newWidthescalon = newWidthescalon - panelWidth
        countWidth++;

      // aqui falta reiniciar el width del triangulo pero en el siguiente nivel, es decir, 
      // después de que al roofHeight se le ha restado 1 unidad de panelHeight
     } 

      countHeight++
      newWidth = roofBase + (factorPendienteAcostado * countHeight)

    /*if (newHeight >= panelWidth) {

      while (newWidth >= panelHeight && newHeight >= panelWidth) {

        newWidth = newWidth - panelHeight

        while (newWidth >= panelHeight) {
          newHeight = newHeight - panelWidth
          countHeight++
        }
      }
    }*/
  }

  //console.log("newWidth final", newWidth)
  //console.log("newHeight final", newHeight)

      var factorPendienteVolteado =   (((((panelWidth - roofHeight) * ((-roofBase)/2))/roofHeight)) * 2) - roofBase
      //console.log("primerRectParado:", factorPendienteVolteado);  

      //console.log("newWidht antes de voltear"+ newWidth)
      newWidth = newWidth - factorPendienteAcostado
      var countWidthVolteado = 0
      newWidth = newWidth + factorPendienteVolteado

      while (newWidth >= panelHeight && newHeight >= panelWidth) {


      newHeight = newHeight - panelWidth
      newWidthescalon = newWidth

      while (newWidthescalon >= panelHeight) {
        newWidthescalon = newWidthescalon - panelHeight
        countWidthVolteado++;

     } 

      countHeight++
      newWidth = roofBase + (factorPendienteVolteado * countHeight)
    }
    //console.log("countWidth ", countWidth)
    //console.log("countWidthVolteado ", countWidthVolteado)
    return countWidth + countWidthVolteado
}


function main(): void {
  console.log("🐕 Wuuf wuuf wuuf 🐕");
  console.log("================================\n");
  
  runTests();

  console.log("🐕 Wuuf wuuf wuuf 🐕");
  console.log("Techo triangular")
  console.log("================================\n");
  
  runTestsTriangle();
}

function runTests(): void {
  const data: TestData = JSON.parse(fs.readFileSync('test_cases.json', 'utf-8'));
  const testCases = data.testCases;
  
  console.log("Corriendo tests:");
  console.log("-------------------");
  
  testCases.forEach((test: TestCase, index: number) => {
    const result = calculatePanels(test.panelW, test.panelH, test.roofW, test.roofH);
    const passed = result === test.expected;
    
    console.log(`Test ${index + 1}:`);
    console.log(`  Panels: ${test.panelW}x${test.panelH}, Roof: ${test.roofW}x${test.roofH}`);
    console.log(`  Expected: ${test.expected}, Got: ${result}`);
    console.log(`  Status: ${passed ? "✅ PASSED" : "❌ FAILED"}\n`);
  });
}

function runTestsTriangle(): void {
  const data: TestDataTriangle = JSON.parse(fs.readFileSync('test_cases_triangle.json', 'utf-8'));
  const testCases = data.testCases;
  
  console.log("Corriendo tests:");
  console.log("-------------------");
  
  testCases.forEach((test: TestCaseTriangle, index: number) => {
    const result = calculatePanelsTriangle(test.panelW, test.panelH, test.roofB, test.roofH);
    const passed = result === test.expected;
    
    console.log(`Test ${index + 1}:`);
    console.log(`  Panels: ${test.panelW}x${test.panelH}, Roof: ${test.roofB}x${test.roofH}`);
    console.log(`  Expected: ${test.expected}, Got: ${result}`);
    console.log(`  Status: ${passed ? "✅ PASSED" : "❌ FAILED"}\n`);
  });
}


main();
