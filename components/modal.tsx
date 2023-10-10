import React from "react";

type ModalProps = {
  handleDeleteClick: () => void;
  deleteComConfirm: () => void;
};

const Modal: React.FC<ModalProps> = ({
  handleDeleteClick,
  deleteComConfirm,
}) => {
  return (
    <div className='flex'>
      <div className='relative'>
        <div className='bg-zinc-800 rounded-2xl shadow-md shadow-indigo-500/50'>
          <button
            className='absolute top-3 right-2.5 text-zinc-400 bg-transparent hover:bg-zinc-200 hover:text-zinc-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-zinc-600 dark:hover:text-white'
            onClick={handleDeleteClick}
          >
            <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='p-6 text-center'>
            <h3 className='mb-5 mt-4 text-lg font-normal text-zinc-200 dark:text-zinc-200'>
              Are you sure you want to delete this comment?
            </h3>
            <button
              className='text-zinc bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
              onClick={deleteComConfirm}
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-hide='popup-modal'
              type='button'
              className='text-zinc-500 bg-white hover:bg-zinc-100 focus:ring-4 focus:outline-none focus:ring-zinc-200 rounded-lg border border-zinc-200 text-sm font-medium px-5 py-2.5 hover:text-zinc-900 focus:z-10 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-500 dark:hover:text-white dark:hover:bg-zinc-600 dark:focus:ring-zinc-600'
              onClick={handleDeleteClick}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
