import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export function AddNewTracker() {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer border border-dashed rounded-xl hover:border-slate-500/50">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FontAwesomeIcon icon={faPlus} />
            </EmptyMedia>
            <EmptyTitle>Add New Tracker</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
} 