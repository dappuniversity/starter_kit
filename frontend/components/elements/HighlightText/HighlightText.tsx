/* eslint-disable react/jsx-props-no-spreading */
import { ElementType, FC } from 'react';
import Highlighter, { HighlighterProps } from 'react-highlight-words';
import { Text, TextProps } from '@mantine/core';
import classnames from 'classnames';

import styles from './HighlightText.module.scss';

interface Props extends TextProps<ElementType> {
  children: HighlighterProps["textToHighlight"],
  highlightWords: HighlighterProps["searchWords"],
  highlightClassName: HighlighterProps["highlightClassName"],
}

const defaultProps = {

};

const HighlightText: FC<Props> = ({
  children, className, highlightClassName, highlightWords, ...props
}: Props) => {
  const textClassNames = classnames(styles.Text, className);
  const highlighTextClassNames = classnames(styles.HighlightText, highlightClassName);

  return (
    <Text
      className={ textClassNames }
      { ...props }
    >
      <Highlighter
        highlightClassName={ highlighTextClassNames }
        highlightTag="strong"
        searchWords={ highlightWords }
        textToHighlight={ children }
      />
    </Text>
  );
};

HighlightText.defaultProps = defaultProps;

export default HighlightText;
