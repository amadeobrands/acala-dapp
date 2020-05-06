import React, { FC } from 'react';
import { isEmpty } from 'lodash';
import { CurrencyId } from '@acala-network/types/interfaces';
import { Card } from '@honzon-platform/ui-components';
import { Token, FormatBalance } from '@honzon-platform/react-components';
import { useLoan, useBalance } from '@honzon-platform/react-hooks';

import classes from './LoanConsole.module.scss';
import { LonaActionButton } from './LoanActionButton';
import { convertToFixed18 } from '@acala-network/app-util';

interface Props {
  token: CurrencyId | string;
}

export const CollateralConsole: FC<Props> = ({
  token
}) => {
  const { currentLoanType, getCurrentUserLoanHelper } = useLoan(token);
  const balance = useBalance(token);
  const currentUserLoanHelper = getCurrentUserLoanHelper();

  if (isEmpty(currentUserLoanHelper) || isEmpty(currentLoanType)) {
    return null;
  }

  return (
    <Card
      className={classes.console}
      header={(
        <>
          <div>
            <span>Collateral</span>
            <Token
              gutter
              token={token}
            />
          </div>
          <FormatBalance
            balance={currentUserLoanHelper.collaterals}
            currency={currentLoanType!.token}
          />
        </>
      )}
      headerClassName={classes.header}
    >
      <div className={classes.item}>
        <div className={classes.itemContent}>
          <p className={classes.itemTitle}>Required for Safety</p>
          <FormatBalance
            balance={currentUserLoanHelper.requiredCollateral}
            className={classes.itemBalance}
            currency={currentLoanType!.token}
          />
        </div>
        <LonaActionButton
          className={classes.itemAction}
          max={convertToFixed18(balance || 0).toNumber()}
          text='Deposit'
          token={token}
          type='deposit'
        />
      </div>
      <div className={classes.item}>
        <div className={classes.itemContent}>
          <p className={classes.itemTitle}>Able to Withdraw</p>
          <FormatBalance
            balance={
              currentUserLoanHelper.collaterals
                ? currentUserLoanHelper.collaterals
                  .sub(currentUserLoanHelper.requiredCollateral)
                : 0
            }
            className={classes.itemBalance}
            currency={currentLoanType!.token}
          />
        </div>
        <LonaActionButton
          className={classes.itemAction}
          max={
            currentUserLoanHelper.collaterals
              ? currentUserLoanHelper.collaterals
                .sub(currentUserLoanHelper.requiredCollateral)
                .toNumber()
              : 0
          }
          text='Withdraw'
          token={token}
          type='withdraw'
        />
      </div>
    </Card>
  );
};