import Document, { DocumentContext } from 'next/document';
import { createStylesServer, ServerStyles } from '@mantine/next';

const stylesServer = createStylesServer();

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    // Add your app specific logic here

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <ServerStyles html={ initialProps.html } server={ stylesServer } />
        </>
      ),
    };
  }
}
