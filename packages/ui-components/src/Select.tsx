import React, { Children, cloneElement } from 'react';
import clsx from 'clsx';
import AntSelect, { SelectProps, SelectValue } from 'antd/lib/select';

import './Select.scss';

function Select<VT extends SelectValue> ({ className, ...props }: SelectProps<VT>): ReactElement {
  // set default props
  return (
    <AntSelect
      {...props}
      className={clsx('aca-select__root', className)}
      defaultActiveFirstOption
      dropdownClassName={clsx('aca-select__dropdown', props.dropdownClassName)}
    >
      {Children.map(props.children, (item) => {
        /* eslint-disable-next-line */
        // @ts-ignore
        return cloneElement(item, { className: clsx('aca-select__option-item', item?.props?.className) });
      })}
    </AntSelect>
  );
}

Select.Option = AntSelect.Option;

export { Select };
