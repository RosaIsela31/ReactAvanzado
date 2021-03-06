import React, { useEffect, useRef, useState  } from 'react'
import { MdFavoriteBorder } from 'react-icons/md'
import { ImgWrapper, Img, Button, Article } from './styles'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

export const PhotoCard = ({ id, likes = 0, src = DEFAULT_IMAGE }) => {
  const [show, setShow] = useState(false)

  const element = useRef(null)

  useEffect(() => {
    // para identificar si la imagen está en el viewport del usuario, de no ser así no cargarlo
    const observer = new window.IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0]
      if (isIntersecting) {
        setShow(true)
        observer.disconnect()
      }
    })

    observer.observe(element.current)
  }, [element])

  return (
    <Article ref={element}>
      {
        show &&
        <>
          <a href={`/detail/${id}`}>
            <ImgWrapper>
              <Img src={src} />
            </ImgWrapper>
          </a>

          <Button>
            <MdFavoriteBorder size='32px' /> {likes} likes!
          </Button>
        </>
      }
    </Article>
  )
}
