import React, { useState } from 'react';
import Styles from '@/styles/dashboard.module.scss'

const MemoBoard = () => {
  const [memo, setMemo] = useState('')
  const [dataMemeo, setDataMemo] = useState<string[]>(['Memo de Test'])

  const hanldeChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setMemo(target.value)

  }
  const handleAddMemo = () => {
    setDataMemo([...dataMemeo, memo])
    setMemo('')
  }
  return (
    <section className={Styles.memoBoard}>
      <h3 className={Styles.memoBoard_title}>Memo Board</h3>
      <div className={Styles.memoBoard_container}>
        <div className={Styles.memoBoard_container_memo}>
          <textarea
            id='textMemo'
            value={memo}
            placeholder='Enter Memo'
            onChange={hanldeChange}
          />
          <button type='button' onClick={handleAddMemo}> add </button>
        </div>
        <div className={Styles.memoBoard_container_memos}>
          <p>Created notes</p>
          <div>
            {
              dataMemeo.map((item, index) =>
                <a className={Styles.memoBoard_container_memos_card} key={index}>{item}</a>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemoBoard;