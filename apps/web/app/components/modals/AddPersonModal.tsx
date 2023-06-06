'use client';

import React from 'react';
import Modal, { ModalProps as BaseModalProps } from './Modal';
import PickLocationMap from '@/app/components/PickLocationMap';
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

type ModalProps = BaseModalProps;

const Input: React.FC<{
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  hidden?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?: (value: string) => void;
}> = ({ label, id, placeholder, type, hidden, register, required, errors }) => {
  return (
    <>
      <Label id={id} label={label} errors={errors} />
      <div className="mt-2">
        <input
          {...register(id, { required })}
          type={type}
          placeholder={placeholder}
          id={id}
          hidden={hidden}
          autoComplete="given-name"
          className={`
            pl-4
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            sm:text-sm 
            sm:leading-6
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
          `}
        />
      </div>
    </>
  );
};
const Label: React.FC<{
  id: string;
  label: string;
  hidden?: boolean;
  errors: FieldErrors;
}> = ({ label, id, errors }) => {
  return (
    <label
      htmlFor={id}
      className={`
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
         ${errors[id] ? 'text-rose-500' : 'text-gray-900'}
        `}
    >
      {label}
    </label>
  );
};

const AddPersonModal: React.FC<ModalProps> = (props: BaseModalProps) => {
  const onMarkerLocationUpdated = (location: [number, number]) =>
    console.log(location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      shortDescription: '',
      imageUrl: '',
      birthDate: '',
      deathDate: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const body = (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            The section contains the main information about person.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                id={'firstName'}
                label={'First name'}
                register={register}
                errors={errors}
                required={true}
                placeholder={'Friedrich'}
              />
            </div>
            <div className="sm:col-span-3">
              <Input
                id={'lastName'}
                label={'Last name'}
                register={register}
                errors={errors}
                required={true}
                placeholder={'Bessel'}
              />
            </div>
            <div className="sm:col-span-3 sm:col-start-1">
              <Input
                id={'birthDate'}
                label={'Birth Date'}
                register={register}
                errors={errors}
                required={true}
                placeholder={'1910-05-30'}
              />
            </div>
            <div className="sm:col-span-3">
              <Input
                id={'deathDate'}
                label={'Death Date'}
                register={register}
                errors={errors}
                required={true}
                placeholder={'1976-04-21'}
              />
            </div>
            <div className="sm:col-span-6">
              <Input
                id={'imagePhotoUrl'}
                label={'Photo Url'}
                register={register}
                errors={errors}
                required={true}
                placeholder={'https://i.pravatar.cc/150?u=fake@pravatar.com'}
              />
            </div>
            <div className="col-span-full">
              <Label id={'about'} label={'Short description'} errors={errors} />
              <div className="mt-2">
                <textarea
                  {...register('about', { required: true })}
                  id="about"
                  name="about"
                  placeholder={
                    'Write a few sentences about what this person was famous for...'
                  }
                  rows={3}
                  className={`
                  pl-4
                  block 
                  w-full 
                  rounded-md 
                  border-0 
                  py-1.5 
                  text-gray-900 
                  shadow-sm 
                  ring-1 
                  ring-inset 
                  ring-gray-300 
                  placeholder:text-gray-400 
                  sm:text-sm 
                  sm:leading-6
                  ${errors['about'] ? 'border-rose-500' : 'border-neutral-300'}
                  ${
                    errors['about']
                      ? 'focus:border-rose-500'
                      : 'focus:border-black'
                  }
                  `}
                  defaultValue={''}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Location
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            This section contains the main information about person location
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 sm:col-start-1">
              <Input
                id={'birthDate'}
                label={'Place'}
                register={register}
                errors={errors}
                required={true}
                placeholder={'Minden'}
              />
            </div>
            <div className="col-span-full">
              <Label id={'location'} label={'Coordinates'} errors={errors} />
              <div className="mt-2">
                <div
                  id="location"
                  className="h-80 block w-full border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                >
                  <PickLocationMap
                    zoom={6}
                    onMarkerLocationUpdated={onMarkerLocationUpdated}
                  />
                </div>
              </div>
              <p className="mt-3 text-xs leading-6 text-gray-600">
                You can drag the marker for proper position
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <Modal
      {...props}
      title={'Add person'}
      body={body}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default AddPersonModal;
