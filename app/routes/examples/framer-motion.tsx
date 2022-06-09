import { motion } from 'framer-motion'

export default function Index() {
  return (
    <div
      style={{
        display: 'flex',
        width: '50%',
        height: '50vh',
        justifyContent: 'center'
      }}
    >
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2 }}>
        <h1>Framer Motion!</h1>
      </motion.div>
    </div>
  )
}
