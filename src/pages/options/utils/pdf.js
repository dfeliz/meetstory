import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const createPdf = (content) => {

    const docDefinition = {
        content
    };

    return pdfMake.createPdf(docDefinition);
}

export {
    createPdf,
};
