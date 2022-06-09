import { ClientOnly, useHydrated } from 'remix-utils'
import { BrokenOnTheServer } from '~/components/client-only/broken-on-the-server.client'
import { ComplexComponent } from '~/components/client-only/complex-component'

export default function ClientOnlyComponents() {
  const hydrated = useHydrated()

  return (
    <>
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => <BrokenOnTheServer />}
      </ClientOnly>
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => <ComplexComponent />}
      </ClientOnly>

      <button
        type="button"
        disabled={!hydrated}
        onClick={() => alert('I has JS loaded!')}
      >
        Try me!
      </button>
    </>
  )
}
