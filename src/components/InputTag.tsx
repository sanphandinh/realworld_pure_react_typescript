import classNames from 'helpers/className.helper';
import React, { useCallback, useRef } from 'react';
import BaseTag from './BaseTag';
import styles from './InputTag.module.css';
type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  placeholder?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
};

const InputTag: React.FC<Props> = ({
  value,
  onChange,
  className,
  placeholder,
  disabled,
  onBlur,
  name,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const valueLength = value.length;
  const keyHandler = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      const { key } = event;
      const text = inputRef.current?.value.trim();
      if (key === 'Enter' && text && !value.includes(text)) {
        event.preventDefault();
        onChange([...value, text]);
        if (inputRef.current) {
          inputRef.current.value = '';
          inputRef.current.focus();
        }
        event.stopPropagation();
      } else if (key === 'Backspace' && !text) {
        onChange(value.slice(0, value.length - 1));
      }
    },
    [disabled, onChange, value]
  );
  return (
    <div className={classNames(styles.tagsInput, className)}>
      {value.map((item) => (
        <BaseTag notRedirect key={item} tag={item} />
      ))}
      <input
        name={name}
        onBlur={onBlur}
        ref={inputRef}
        disabled={disabled}
        className={styles.input}
        placeholder={valueLength ? undefined : placeholder}
        onKeyDown={keyHandler}
      />
    </div>
  );
};

export default InputTag;
