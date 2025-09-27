import Text from '../atoms/Text';

export default function Header() {
    return (
    <header className="app-header mt-4">
        <Text As="h1" className="text-2xl font-bold text-center font-[Montserrat] text-text-primary animate-title underline underline-offset-4 sm:text-3xl" aria-label="App Title">
            Schedule Your Day with Kitaro's To-Do List App
        </Text>
    </header>
    )
}