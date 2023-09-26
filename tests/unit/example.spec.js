describe('Example Component',()=>{
  test('Debe de ser mayor a 10',()=>{
    // Arreglar
    let value = 10;

    // Actuar
    value = value + 2;

    // Resultado
    expect(value).toBeGreaterThan(10)

  })
})