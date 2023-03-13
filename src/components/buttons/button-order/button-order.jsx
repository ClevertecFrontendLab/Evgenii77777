/* eslint-disable react/button-has-type */
import cn from 'classnames';

export const ButtonOrder = ({
  text,
  booked = false,
  postponed = false,
  page = false,
  order = false,
  test = '',
  type = 'button',
  func = (e) => e.stopPropagation(),
  dis,
}) => (
  <button
    onClick={func}
    disabled={postponed || dis}
    className={cn('base', { booked, pageBtn: page, orderBtn: order })}
    type={type}
    data-test-id={test}
  >
    {text}
  </button>
);
