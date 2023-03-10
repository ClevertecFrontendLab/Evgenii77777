export const errorPhone = (value, errors) => {
  if (errors?.type === 'required') {
    return (
      <span data-test-id='hint' className='modal-input-line_instructions__warning-text'>
        Поле не может быть пустым
      </span>
    );
  }

  if (errors?.type === 'pattern') {
    return (
      <span data-test-id='hint' className={styles}>
        В формате +375 (xx) xxx-xx-xx
      </span>
    );
  }

  return <span data-test-id='hint'>В формате +375 (xx) xxx-xx-xx</span>;
};
