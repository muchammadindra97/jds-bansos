describe('Formulir Penerima', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '*/api/*'
      },
      []
    );

    cy.visit('/');
  })

  it('render invalid form notification', () => {
    cy.contains('Periksa kembali isian form Anda!').should('not.exist');
    cy.contains('button', 'Kirim').click();
    cy.contains('Periksa kembali isian form Anda!');
  });

  it('should not go to preview data if form invalid', () => {
    cy.contains('button', 'Kirim').click();
    cy.get('[data-cy="title-previewPenerima"]').should('not.exist');
    cy.get('[data-cy="title-formulirPenerima"]');
  });

  it('render deskripsi alasan lainnya text area', () => {
    cy.get('[data-cy="textarea-alasanLainnya"]').should('not.exist');
    cy.get('[data-cy="select-alasan"]').parent().click();
    cy.get('[role="listbox"]').contains('Lainnya').click();
    cy.get('[data-cy="textarea-alasanLainnya"]');
  });

  it('render preview foto KTP', () => {
    cy.get('[data-cy="img-previewKTP"]').should('not.exist');
    cy.get('[data-cy="inputfile-fotoKTP"]').selectFile('tests/e2e/fixtures/testimage.png', {force: true});
    cy.get('[data-cy="img-previewKTP"]');
  });

  it('render preview foto KK', () => {
    cy.get('[data-cy="img-previewKK"]').should('not.exist');
    cy.get('[data-cy="inputfile-fotoKK"]').selectFile('tests/e2e/fixtures/testimage.png', {force: true});
    cy.get('[data-cy="img-previewKK"]');
  });
})