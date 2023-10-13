"use client";
import { MdOutlineEmail, MdLock, MdPerson, MdOutlineFileUpload, MdImage } from "react-icons/md";
import styles from '@/styles/page.module.scss'
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { registerService } from '@/service/UserService'
import Loading from "@/app/loading";
import { MessageComponent } from "./NotificationComponent";

interface User {
  email: string;
  password: string;
}

interface userRegister {
  fullName: string,
  email: string,
  password: string,
  image: string | null
}

interface UserData {
  fullname: string;
  token: string;
  email: string;
  role: string;
  status: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [register, setRegister] = useState<Boolean>(false)
  const [user, setUser] = useState<User>({
    email: '',
    password: ''
  })
  const [userRegister, setUserRegister] = useState<userRegister>({
    email: '',
    password: '',
    fullName: '',
    image: null
  })

  const [image, setImage] = useState<string | null>(null)

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      readFile(event.target.files[0]);
      setUserRegister({
        ...userRegister,
        [event.target.name]: event.target.files[0],
      });
    }
  }

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleChange(event: React.SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    !register
      ? setUser({ ...user, [target.name]: target.value })
      : setUserRegister({ ...userRegister, [target.name]: target.value })
  }

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    signIn('credentials',
      {
        email: user.email,
        password: user.password,
        redirect: false
      }
    ).then((result) => {
      if (result?.ok) {
        setLoading(false)
        router.push('/dashboard')
        router.refresh()
      }
      else {
        MessageComponent('error', 'Error!', result?.error || '')
      }
    }).catch(error => {
      MessageComponent('error', 'Error!', error)
    })
      .finally(() => {
        setLoading(false)
      })
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()
      data.append('email', userRegister.email)
      data.append('fullName', userRegister.fullName)
      data.append('password', userRegister.password)
      if (userRegister.image) {
        data.append('image', userRegister.image)
      }

      const res = await registerService(data)
      MessageComponent('success', 'Saved!', res.message)
      setRegister(false)
    } catch (error: any) {
      MessageComponent('error', error?.response?.data?.message, error?.response?.data?.error)
    } finally {
      setLoading(false)
      setUserRegister({
        email: '',
        password: '',
        fullName: '',
        image: null
      })
      setImage(null)
    }
  }

  return (
    <>
      {loading &&
        <div className={styles.login_form} style={{ backgroundColor: '#FDFEFE' }} >
          <Loading />
        </div>
      }
      {!loading && (
        <form className={styles.login_form} onSubmit={!register ? handleLogin : handleRegister}>
          <Image
            src={'https://res.cloudinary.com/ds8a1x14x/image/upload/v1695981560/background/LOGO-LIFE-HUB_xsyj9v.png'}
            alt={"LIFEHUB360"}
            priority={true}
            width={160}
            height={100}
            className={styles.login_form_logo}
          />
          <h1>{!register ? 'Welcome to lifehub360' : 'Create Your Account'}</h1>
          {!register
            && (<p>Your personal management platform for a more organized and balanced life.</p>)}
          {
            register &&
            (
              <div className={styles.login_form_container}>
                <div className={styles.login_form_container_image_container}>
                  {image &&
                    <Image
                      src={image}
                      alt='imagen'
                      width={0}
                      height={0}
                      className={styles.image}
                    />}
                  {!image && <MdImage className={styles.image} />}
                  <a className={styles.upload} onClick={handleUploadClick}>
                    <MdOutlineFileUpload size={20} /> UPLOAD
                  </a>
                </div>
                <input
                  ref={inputRef}
                  type='file'
                  name='image'
                  id='image'
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  accept='image/*'
                />
              </div>
            )
          }
          {register &&
            <div className={styles.login_form_container}>
              <MdPerson size={20} className={styles.icon} />
              <input
                id='fullName'
                name='fullName'
                type='text'
                placeholder='fullName'
                value={userRegister.fullName}
                onChange={handleChange}
                required
              />
            </div>
          }
          <div className={styles.login_form_container}>
            <MdOutlineEmail size={20} className={styles.icon} />
            <input
              id='email'
              name='email'
              type='email'
              placeholder='email@domain.com'
              value={!register ? user.email : userRegister.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.login_form_container}>
            <MdLock size={20} className={styles.icon} />
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              value={!register ? user.password : userRegister.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{!register ? 'Login' : 'Register'}</button>
          <p style={{ width: '100%', fontSize: '12px' }}>
            {!register ? 'Dont have an account?' : 'Already have an account?'}
            <a onClick={() => setRegister(!register)}> {!register ? 'Register now' : 'Login'} </a>
          </p>
        </form>
      )}
    </>
  )
}

export default LoginForm