import { Link } from "react-router"

import { BorderBeam } from "@/components/magicui/border-beam"
import { TextAnimate } from "@/components/magicui/text-animate"
import { Button } from "@/components/ui/button"

export function Home() {
  return (
    <div className="flex min-h-screen justify-center text-white">
      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-heading text-7xl font-semibold">
          <TextAnimate animate="scaleUp" by="text" duration={2}>
            Sistema de Estoque
          </TextAnimate>
        </h1>

        <p className="font-text text-center text-sm font-light">
          <TextAnimate animation="slideLeft" by="character" duration={1.5}>
            Faça seu controle de estoque, evitando desperdícios e melhorando a
            organização
          </TextAnimate>
        </p>

        <Link to="/table">
          <Button className="relative w-36 cursor-pointer overflow-hidden p-6">
            Navegar
            <BorderBeam
              size={40}
              initialOffset={20}
              className="from-transparent via-violet-500 to-transparent"
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
              }}
            />
          </Button>
        </Link>
      </main>
    </div>
  )
}
