import { Input, CloseButton, Button } from '@mantine/core';

type SearchBarPropTypes = {
    onClick: () => void
    searchValue: string
    setSearchValue: (value: string) => void
  }

export const SearchBar = ({searchValue, setSearchValue, onClick}: SearchBarPropTypes) => {
    return (
        <>
            <Input
                placeholder="Clearable input"
                value={searchValue}
                onChange={(event) => setSearchValue(event.currentTarget.value)}
                rightSectionPointerEvents="all"
                mt="md"
                rightSection={
                    <CloseButton
                    aria-label="Clear input"
                    onClick={() => setSearchValue('')}
                    style={{ display: searchValue ? undefined : 'none' }}
                    />
                }
            />
            <Button variant="outline" mt="md" ml='sm' radius="md" onClick={onClick}>Search</Button>
        </>
    )
}