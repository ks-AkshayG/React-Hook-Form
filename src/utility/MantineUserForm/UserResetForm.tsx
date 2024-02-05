import { Button, Group } from "@mantine/core";

type UserResetFormPropTypes = {
    onClick?: () => void;
  };

const UserResetForm = ({ onClick }: UserResetFormPropTypes) => {
    return (
      <div className="mx-2">
        <Group justify="flex-center" mt="md">
          <Button type="reset" onClick={onClick}>
            Reset
          </Button>
        </Group>
      </div>
    );
  };

export default UserResetForm