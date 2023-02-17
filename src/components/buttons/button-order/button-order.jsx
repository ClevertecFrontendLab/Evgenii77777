import cn from 'classnames';

export const ButtonOrder = ({ text, booked = false, postponed = false, page = false, order = false, test = '' }) => (
  <button
    onClick={(e) => e.stopPropagation()}
    disabled={postponed}
    className={cn('base', { booked, pageBtn: page, orderBtn: order })}
    type='button'
    data-test-id={test}
  >
    {text}
  </button>
);
